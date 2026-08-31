const scheduleService = require('../service/scheduleService')

// 특정 스케줄 좌석 상태 조회
exports.getScheduleSeat = async(req, res) => {
    try{
        const scheduleSeat = await scheduleService.getScheduleSeat(req.params.id)

        return res.status(200).json(scheduleSeat)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 스케줄 조회(조건 검색)
exports.getSchedule = async(req, res) => {
    try{
        const filters = req.query
        const schedule = await scheduleService.getSchedule(filters)

        return res.status(200).json(schedule)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 스케줄 상세조회
exports.getScheduleDetail = async (req, res) => {
    try{
        const schedule = await scheduleService.getScheduleDetail(req.params.id)

        return res.status(200).json(schedule)

    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 스케줄 등록
exports.postSchedule = async(req, res) => {
    try{
        const schedule = await scheduleService.postSchedule(req.body)

        return res.status(200).json(schedule)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 스케줄 수정
exports.updateSchedule = async(req, res) => {
    try{
        const schedule = await scheduleService.updateSchedule(req.params.id, req.body)

        return res.status(200).json(schedule)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 스케줄 삭제
exports.deleteSchedule = async (req, res) => {
    try{
        const schedule = await scheduleService.deleteSchedule(req.params.id)

        return res.status(200).json(schedule)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}