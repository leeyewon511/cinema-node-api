const express = require('express')
const router = express.Router()
const scheduleController = require('../controller/scheduleController')

// 회원 & 관리자
// 특정 스케줄 좌석 상태 조회
router.get('/:schedule_id/seats', scheduleController.getScheduleSeat)
// 스케줄 조회(조건 검색)
router.get('/', scheduleController.getSchedule)
// 스케줄 상세조회
router.get('/:id', scheduleController.getScheduleDetail)


// 관리자
// 스케줄 등록 & 수정 & 삭제
router.post('/', scheduleController.postSchedule)
router.patch('/:id', scheduleController.updateSchedule)
router.delete('/:id', scheduleController.deleteSchedule)

module.exports = router