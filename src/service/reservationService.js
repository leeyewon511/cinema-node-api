const db = require('../config/db')


// 내 예매내역 조회
exports.getMyReservations = async (memberId) => {
  const [rows] = await db.query(
    `SELECT r.reservation_id, r.reservation_date, r.total_price, r.status,
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
exports.cancleReservation = async(reservationId) => {
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

        // 좌석을 다시 예약 가능하게 복구
        if (seatIds.length > 0) {
            await connection.query(
                `UPDATE schedule_seat SET seat_status = '예약가능' where schedule_seat_id IN (?) `,
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
    `SELECT r.reservation_id, r.reservation_date, r.total_price, r.status,
            mem.name AS member_name, m.title AS movie_title
     FROM reservation r
     JOIN member mem ON r.member_id = mem.member_id
     JOIN schedule s ON r.schedule_id = s.schedule
     JOIN movie m ON s.movie_id = m.movie_id
     ORDER BY r.reservation_date DESC`
  );
  return rows;
};