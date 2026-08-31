const seatService = require('../service/seatService')

// 특정 상영관 좌석 목록
exports.getSeat = async (req, res) => {
    try{
        const seat = await seatService.getSeat(req.params.screenId)
        return res.status(200).json(seat)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 좌석 등록
exports.postSeat = async(req, res) => {
    try{
        const seat = await seatService.postSeat(req.body)
        return res.status(200).json(seat)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 좌석 삭제
exports.deleteSeat = async(req, res) => {
    try{
        const seat = await seatService.deleteSeat(req.params.id)
        return res.status(200).json(seat)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}