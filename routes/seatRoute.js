const express = require('express')
const router = express.Router()
const seatController = require('../controller/seatcontroller')
const { route } = require('./movieRoute')

// 관리자 (좌석 조회 & 등록 & 삭제)
router.get('/screen/:screenId', seatController.getSeat)
router.post('/', seatController.postSeat)
router.delete('/:id', seatController.deleteSeat)

module.exports = router