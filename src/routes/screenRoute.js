const express = require('express')
const router = express.Router()
const screenController = require('../controller/screenController')

// 관리자 (상영관 목록조회 & 상세조회 & 등록 & 수정 & 삭제)
router.get('/', screenController.getScreen)
router.get('/:id', screenController.getScreenDetail)
router.post('/', screenController.postScreen)
router.patch('/:id', screenController.updateScreen)
router.delete('/:id', screenController.deleteScreen)



module.exports = router