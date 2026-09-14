const express = require('express')
const router = express.Router()
const reservationController = require('../controller/reservationController')
const { verifyToken, requireAdmin } = require('../middlewares/authMiddleware'); 

// 회원 (예매 신청)  
router.post('/', reservationController.createReservation)

// 회원 (내 예매 내역 조회)
router.get('/my', reservationController.getMyReservations)

// 회원 (예매 취소)
router.delete('/:id', reservationController.cancelReservation)

// 관리자 (전체 예매 현황 조회)
router.get('/', verifyToken, requireAdmin, reservationController.getAllReservations)

module.exports = router