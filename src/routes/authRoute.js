const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')

// 회원가입
router.post('/signup', authController.signup) 

module.exports = router