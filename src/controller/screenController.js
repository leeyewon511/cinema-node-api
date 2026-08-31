const screenService = require('../service/screenService')

// 상영관 목록조회
exports.getScreen = async(req, res) => {
    try{
        const screen = await screenService.getScreen()

        return res.status(200).json(screen)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 상영관 상세조회
exports.getScreenDetail = async(req, res) => {
    try{
        const {id} = req.params
        const screen = await screenService.getScreenDetail(id)

        return res.status(200).json(screen)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 상영관 등록
exports.postScreen = async (req, res) => {
    try{
        const screen = await screenService.postScreen(req.body)

        return res.status(200).json(screen)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 상영관 정보수정
exports.updateScreen = async (req, res) => {
    try{
        const {id} = req.params
        const screen = await screenService.updateScreen(id, req.body)

        return res.status(200).json(screen)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 상영관 삭제 
exports.deleteScreen = async (req, res) => {
    try{
        const {id} = req.params
        const screen = await screenService.deleteScreen(id)

        return res.status(200).json(screen)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}