const db = require('../config/db')

const TICKET_PRICE = 12000

// 예매 신청
exports.createReservation = async(memberId, scheduleId, seatIds) => {
    const connection = await db.getConnection()
    try{
        await connection.beginTransaction()

        // 1단계: 좌석이 지금 예약 가능한 상태인지 확인 + 잠금
        const [seats] = await connection.query(`
             SELECT schedule_seat, seat_status
             FROM schedule_seat
             WHERE schedule_seat IN (?) AND schedule_id = ?
             FOR UPDATE
            `, [seatIds, scheduleId])

        if (seats.length !== seatIds.length) {
           const err = new Error('존재하지 않는 좌석이 포함되어 있습니다.')
            err.status = 400
            throw err
        }

        const alreadyRaken = seats.some((s) => s.seat_status !== '예약가능')
        if(alreadyRaken){
            const err = new Error('이미 예약된 좌석이 포함되어 있습니다.')
            err.status = 400
            throw err
        }

        //2단계: reservation 한 건 생성
        const totalPrice = TICKET_PRICE * seatIds.length

        const [reservationResult] = await connection.query(
            `INSERT INTO reservation (reservation_date, total_price, status, member_id, schedule_id) VALUES (NOW(), ?, '예매확정', ?, ?)`,
             [totalPrice, memberId, scheduleId]
        )

        const reservationId = reservationResult.insertId

        // 3단계: reservation_item(예매-좌석 매핑) 여러 건 생성
        const values = seatIds.map((seatId) => [reservationId, TICKET_PRICE,  seatId])

        await connection.query(
            `INSERT INTO reservation_item (reservation_id, price, schedule_seat_id) VALUES ?`,
            [values]
        )

        // 4단계: 좌석 상태 변경
        await connection.query(
            `UPDATE schedule_seat SET seat_status = '예약됨' WHERE schedule_seat  IN (?)`,
            [seatIds]
        )

        // 5단계: payment 생성
        await connection.query(
            `INSERT INTO payment (amount, payment_date, payment_status, reservation_id) VALUES (?, NOW(), '결제완료', ?)`, [totalPrice, reservationId]
        )

        await connection.commit()

        return { reservationId, totalPrice }



    } catch (err) {
        await connection.rollback()
        throw err

    } finally {
        connection.release()
    }
}

// 내 예매내역 조회
exports.getMyReservations = async (memberId) => {
  const [rows] = await db.query(
    `SELECT r.reservation AS reservation_id, r.reservation_date, r.total_price, r.status,
            m.title AS movie_title, s.show_date, s.show_time
     FROM reservation r
     JOIN schedule s ON r.schedule_id = s.schedule
     JOIN movie m ON s.movie_id = m.movie_id
     WHERE r.member_id = ?
     ORDER BY r.reservation_date DESC`,
    [memberId]
  );
  return rows;
};

// 내 예매 취소
exports.cancelReservation = async(reservationId) => {
    const connection = await db.getConnection();
    try{
        await connection.beginTransaction();

        //이 예매에 연결된 좌석 id 들을 먼저 찾아둠. (나중에 복구하기 위해)
        const [items] = await connection.query(
            `SELECT schedule_seat_id
             FROM reservation_item
             WHERE reservation_id = ?`,[reservationId]
        )
        const seatIds = items.map((i) => i.schedule_seat_id)

        // 결제 취소 처리
        await connection.query(
            `UPDATE payment SET payment_status = '취소완료' WHERE reservation_id = ?`,
            [reservationId]
        )

        // 예매 상태 취소 변경
        await connection.query(
            `UPDATE reservation SET status = '취소' WHERE reservation = ? `,
            [reservationId]
        )

        // 좌석을 다시 예약 가능하게 복구
        if (seatIds.length > 0) {
            await connection.query(
                `UPDATE schedule_seat SET seat_status = '예약가능' where schedule_seat IN (?) `,
                [seatIds]
            )
        }

        await connection.commit()

    } catch (err) {
        await connection.rollback()
        throw err
    } finally {
        connection.release()
    }
}

// 전체 예매 현황 (관리자)
exports.getAllReservations = async () => {
  const [rows] = await db.query(
    `SELECT r.reservation AS reservation_id, r.reservation_date, r.total_price, r.status,
            mem.name AS member_name, m.title AS movie_title
     FROM reservation r
     JOIN member mem ON r.member_id = mem.member
     JOIN schedule s ON r.schedule_id = s.schedule
     JOIN movie m ON s.movie_id = m.movie_id
     ORDER BY r.reservation_date DESC`
  );
  return rows;
};