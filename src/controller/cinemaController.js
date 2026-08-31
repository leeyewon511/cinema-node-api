const cinemaService = require('../service/cinemaService')

// *****회원******

// 영화관 목록조회
exports.getCinema = async (req, res) => {
    try{
        const cinema = await cinemaService.getCinema()

        return res.status(200).json(cinema)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

//영화관 상세조회
exports.getCinemaDetail = async (req, res) => {
    try{
        const {id} = req.params
        const cinema = await cinemaService.getCinemaDetail(id)

        return res.status(200).json(cinem)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
} 


// *****관리자*****

// 영화관 등록
exports.postCinema = async (req, res) => {
    try{
        const cinema = await cinemaService.postCinema(req.body)

        return res.status(200).json(cinema)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 영화관 수정
exports.updateCinema = async (req, res) => {
    try{
        const {id} = req.params
        const cinema = await cinemaService.updateCinema(id, req.body)

        return res.status(200).json(cinema)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 영화관 삭제
exports.deleteCinema = async (req, res) => {
    try{
        const {id} = req.params
        const cinema = await cinemaService.deleteCinema(id)

        return res.status(200).json(cinema)
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}