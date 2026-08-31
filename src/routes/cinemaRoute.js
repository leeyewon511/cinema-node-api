const express = require('express')
const router = express.Router()
const cinemaController = require('../controller/cinemaController')

//회원(영화관 목록조회 & 영호관 상세조회)
router.get('/', cinemaController.getCinema)
router.get('/:id', cinemaController.getCinemaDetail)

//관리자(영화 등록 & 수정 & 삭제)
router.post('/', cinemaController.postCinema)
router.patch('/:id', cinemaController.updateCinema)
router.delete('/:id', cinemaController.deleteCinema)

module.exports = router