const db = require('../config/db')

// 예매 신청

// 예매 취소

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