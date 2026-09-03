const authService = require('../service/authService')

// 회원가입
exports.signup = async(req, res) => {
    try{
        const {loginId, password, name, phone} = req.body
        await authService.signup(loginId, password, name, phone)

        return res.status(200).json({message: '회원가입이 완료되었습니다.'})
    } catch (err) {
        return res.status(err.status || 500).json(err.message)
    }
}