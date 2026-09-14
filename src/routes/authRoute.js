const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const { verifyToken } = require('../middlewares/authMiddleware')

// 회원가입
router.post('/signup', authController.signup) 

// 로그인
router.post('/login', authController.login)

// 내 정보 조회
router.get('/me', verifyToken, authController.getMyInfo)

// 내 정보 수정
router.put('/me', verifyToken, authController.updateMyInfo)

module.exports = router