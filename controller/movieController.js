const movieService = require('../service/movieService')

// ***** 회원 *****

// 영화 전체 조회
exports.getMovie = async(req, res) => {
    try{
        const movie = await movieService.getMovie()

        return res.status(200).json(movie)

    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 영화 상세 조회
exports.getMovieDetail = async(req, res) => {
    try{
        const {id} = req.params
        const movie = await movieService.getMovieDetail(id)

        return res.status(200).json(movie)

    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}


// ***** 관리자 *****

// 영화 등록
exports.postMovie = async(req, res) => {
    try{
        const movie = await movieService.postMovie(req.body)

        return res.status(200).json(movie)

    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 영화 수정
exports.updateMovie = async(req, res) => {
    try{
        const {id} = req.params
        const movie = await movieService.updateMovie(id, req.body)

        return res.status(200).json(movie)

    } catch (err) {
        return res.status(err.status || 500).json({message: err.message})
    }
}

// 영화 삭제
exports.deleteMovie = async(req, res) => {
    try{
        const {id} = req.params
        const movie = await movieService.deleteMovie(id)

        return res.status(200).json(movie)
    } catch (err) {
        return res.status(err.status || 500)
    }
}