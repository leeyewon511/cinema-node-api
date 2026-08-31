const reservationService = require('../service/reservationService')

// 예매 신청
exports.createReservation = async(req, res) => {
    try{
        const {memberId, scheduleId, seatIds} = req.body

        const result = await reservationService.createReservation(memberId, scheduleId, seatIds)

        return res.status(200).json(result)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 내 예매내역 조회
exports.getMyReservation = async(req, res) => {
    try{
        const memberId = req.query.memberId
        const list = await reservationService.getMyReservation(memberId)

        return res.status(200).json(list)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 예매 취소
exports.cancelReservation = async(req, res) => {
    try{
        const reservationId = req.params.id
        await reservationService.cancelReservation(reservationId)

        return res.status(200).json({message: '예매가 취소되었습니다.'})
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 관리자 - 전체 예매 현황
exports.getAllReservations = async(req, res) => {
    try{
        const list = await reservationService.getAllReservations()
        return res.status(200).json(list)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}