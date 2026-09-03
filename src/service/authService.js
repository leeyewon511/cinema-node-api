const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

// 회원가입
exports.signup = async(loginId, password, userName , phone) => {
    // 필수값 비었는지 확인
    if(!loginId || !password || !userName || !phone ) {
        const err = new Error('해당 필수 값을 입력하지 않았습니다.')
        err.status = 400
        throw err
    }

    // 아이디 중복체크
    const [existing] = await db.query(
        `SELECT login_id FROM member WHERE login_id = ?`, 
        [loginId]
    )

    if(existing.length > 0 ) {
        const err = new Error('이미 사용 중인 아이디입니다.')
        err.status = 400 
        throw err
    }

    // 비밀번호 최소 길이
    if(password.length < 10) {
        const err = new Error('비밀번호는 10자 이상이어야 합니다.')
        err.status = 400
        throw err
    }


    const hashedPassword = await bcrypt.hash(password, 10)

    await db.query(
        `INSERT INTO member (login_id, password, name, phone, member_status, role) VALUES (?, ?, ?, ?, '정상', '회원')`,
        [loginId, hashedPassword, userName, phone]
    )
}