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

// 로그인
exports.login = async (loginId, password) => {

    if(!loginId){
        const err = new Error('아이디를 입력하지 않았습니다.')
        err.status = 400
        throw err
    }

    if(!password){
        const err = new Error('비밀번호를 입력하지 않았습니다. ')
        err.status = 400
        throw err
    }

    // 아이디 자체가 존재하지 않는 경우
    const [rows] = await db.query(
        `SELECT member, password, name, role, member_status
         FROM member WHERE login_id = ?`,
         [loginId]
    )

    if(rows.length === 0) {
        const err = new Error('아이디 또는 비밀번호가 올바르지 않습니다.')
        err.status = 401
        throw err
    }

    const member = rows[0]

    if(member.member_status ===  '정지') {
        const err = new Error('정지된 계정입니다.')
        err.status = 403
        throw err
    }

    // 비밀번호 비교 (DB에 저장된 해시값과 일치하는지)
    const isMatch = await bcrypt.compare(password, member.password)
    console.log('입력한 비밀번호:', password)
    console.log('DB에 저장된 해시:', member.password)
    console.log('비교 결과:', isMatch)

    if(!isMatch){
        const err = new Error('아이디 또는 비밀번호가 올바르지 않습니다.')
        err.status = 401
        throw err
    }


    // 토큰 안에 담을 정보
    const payload = {
        memberId: member.member,
        role: member.role,
    }

    // 2시간 뒤 자동 만료
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'})

    return {token, name: member.name, role: member.role}
}