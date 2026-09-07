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

// 로그인
exports.login = async(req, res) => {
    try{
        const {loginId, password} = req.body
        const result = await authService.login(loginId, password)
        res.status(200).json(result)
     } catch (err) {
        res.status(err.status || 500).json(err.message)
     }
}

// 내 정보 조회
exports.getMyInfo = async(req, res) => {
    try{
        const info = await authService.getMyInfo(req.user.memberId)
        res.status(200).json(info)
    } catch (err) {
        res.status(err.status || 500).json({message: err.message})
    }
    
    
}

// 네 정보 수정
exports.updateMyInfo = async (req, res) => {
    try{
        const {name, phone} = req.body
        await authService.updateMyInfo(req.user.memberId, name, phone)
        res.status(200).json({message: '정보가 수정되었습니다.'})
    } catch (err) {
        res.status(err.status || 500).json({message: err.message})
    }
}