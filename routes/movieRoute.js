const express = require('express')
const router = express.Router()
const movieController = require('../controller/movieController')

// 회원 (영화 전체 조회 & 영화 상세조회)
router.get('/', movieController.getMovie)
router.get('/:id', movieController.getMovieDetail)

// 관리자 (영화 등록 & 수정 & 삭제)
router.post('/', movieController.postMovie)
router.patch('/:id', movieController.updateMovie)
router.delete('/:id', movieController.deleteMovie)


module.exports = router
