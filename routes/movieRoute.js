const express = require('express')
const router = express.Router()
const db = require('../db')

// ***************** 관리자 ***********************

// 1. 영화 등록
router.post('/', async (req, res) => {
    try {
        // 1. 관리자가 영화 정보를 입력하여 요청한다
        // 2. 요청값이 빠졌을 시 입력되지 않은 란이 있음을 반환한다.
        // 3. 개봉일이 종영일보다 늦은지 확인한다.
        // 3-1. 늦으면 개봉일 재확인 반환한다.
        // 4. 전부 맞을 시 db에 insert한다.

        const { post, title, genre, prolog, release_date, end_date, movie_status } = req.body

        if (!post || !title || !genre || !prolog || !release_date || !end_date || !movie_status) {
            return res.status(400).json({ message: '필수 입력 값을 입력하지 않았습니다' })
        }

        if (new Date(release_date) > new Date(end_date)) {
            return res.status(400).json({ message: '개봉일이 종영일보다 늦을 수 없습니다.' })
        }

        const [result] = await db.query('insert into movie (post, title, genre, prolog, release_date, end_date, movie_status) values (?, ?, ?, ?, ?, ?, ?)', [post, title, genre, prolog, release_date, end_date, movie_status])

        return res.status(200).json({
            movie_id: result.insertId,
            post,
            title,
            genre,
            prolog,
            release_date,
            end_date,
            movie_status
        })

    } catch (err) {
        return res.json({ message: err.message })
    }
})

// 2. 영화 수정
router.patch('/:id', async (req, res) => {

    // 1. 수정할 영화의 id를 경로 파라미터에서 받음
    // 2. 수정 요청으로 들어온 값을 body에서 꺼냄
    // 3. 수정 대상 영화가 실제로 존재하는지 db에서 조회
    // 3-1. 존재하지 않으면 '존재하지 않음' 반환
    // 4. 각 필드별로 요청에 값이 있으면 새 값 사용, 없으면 기존 db 값 그대로 유지
    // 5. 확정된 개봉일/종영일로 날짜 유효성 재검증
    // 5-1. 개봉일이 종영일보다 늦으면 에러 반환
    // 6. 최종 확정된 값들로 update 

    try {
        const { id } = req.params
        const { post, title, genre, prolog, release_date, end_date, movie_status } = req.body

        const [rows] = await db.query('select * from movie where id = ?', [id])

        if (rows.length === 0) {
            return res.status(404).json({ message: '해당 영화를 찾을 수 없습니다.' })
        }

        const existingMovie = row[0]

        const updatePost = post || existingMovie.post
        const updateTitle = title || existingMovie.title
        const updateGenre = genre || existingMovie.genre
        const updateProlog = prolog || existingMovie.prolog
        const updateReleaseDate = release_date || existingMovie.release_date
        const updateEndDate = end_date || existingMovie.end_date
        const updateMovieStatus = movie_status || existingMovie.movie_status

        if (new Date(release_date) > new Date(end_date)) {
            return res.status(400).json({ message: '개봉일이 종영일보다 늦을 수 없습니다. ' })
        }

        await db.query('update movie set post = ?, title = ?, genre = ?, prolog = ?, release_date = ?, end_date = ?, movie_status = ? where movie_id = ?',
            [post, title, genre, prolog, release_date, end_date, movie_status, id])

        return res.status(200).json({
            movie_id: id,
            post: updatePost,
            title: updateTitle,
            genre: updateGenre,
            prolog: updateProlog,
            release_date: updateReleaseDate,
            end_date: updateEndDate,
            movie_status: updateMovieStatus,
        })
        
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

// 3. 영화 삭제
router.delete('/:id', async(req, res) => {

    // 1. 요청한 id값이 db에 존재하는지 확인한다.
    // 1-1. 없을 시 해당 영화가 존재하지 않음 반환한다.
    // 2. 존재할 시 해당 영화 삭제 쿼리 실행한다.
    
    try{
        const {id} = req.params

        const [rows] = await db.query('select * from movie where movie_id = ?', [id])
        
        if(rows.length === 0){
            return res.status(404).json({message: '해당 영화를 찾을 수 없습니다.'})
        }

        await db.query('delete from movie where movie_id = ?', [id])

        return res.status(200).json({
            message: '영화가 삭제되었습니다.'
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})



// ***************** 회원 ***********************

// 1. 전체 영화 목록 조회
router.get('/', async(req, res) => {

    // 1. movie 테이블 전체 조회한다.
    // 2. 조회된 목록 그대로 응답한다.

    try{
        const [rows] = await db.query('select * from movie ')

        return res.status(200).json(rows)

    } catch(err){
        return res.status(500).json({message: err.message})
    }
})

// 2. 영화 상세 조회
router.get('/:id', async(req, res) => {

    // 1. 조회할 영화의 id를 받는다.
    // 2. 해당 id의 영화가 db에 존재하는지 확인한다.
    // 2-1. 존재하지 않을 시 해당 영화가 존재하지 않음 반환한다.
    // 3. 존재할 시 해당 영화 정보를 응답한다.

    try{
        const {id} = req.params

        const [rows] = await db.query('select * from movie where movie_id = ?', [id])

        if(rows.length === 0){
            return res.status(404).json({message: '해당 영화를 찾을 수 없습니다.'})
        }

        return res.status(200).json(rows[0])

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})


module.exports = router
