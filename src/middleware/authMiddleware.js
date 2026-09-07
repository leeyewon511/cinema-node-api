const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

// 로그인 여부 검증 (verifyToken)
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader){
        return res.status(401).json({message: '로그인이 필요합니다.'})
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({message: '토큰 형식이 올바르지 않습니다. '})
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET)

        req.user = decoded

        next()
    } catch (err) {
        return res.status(401).json({message: '유효하지 않거나 만료된 토큰입니다.'})
    }
}

// 관리자 권환 확인 (requireAdmin)
exports.requireAdmin = (req, res, next) => {
    if (req.user.role !== '관리자') {
        return res.status(403).json({message: '관리자만 접근할 수 있습니다.'})
    }

    next()
}

