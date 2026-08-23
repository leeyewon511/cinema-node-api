const db = require('../db')

// 영화 조회
const existMovie = async (id) => {
    const [rows] = await db.query('select * from movie where id = ?', [id])

    if (rows.length === 0){
        const err = new Error('해당 영화를 찾을 수 없습니다.')
        err.status = 404
        throw err
    }

    return rows[0]
}

//*****회원*****

// 영화 전체 조회
exports.getMovie = async () => {
        const [rows] = await db.query('select * from movie')
        return rows
}

// 영화 상세조회
exports.getMovieDetail = async (id) => {
    return await existMovie(id)
    
}


// *****관리자*****

// 영화 등록
exports.postMovie = async (movieData) => {
    const { post, title, genre, prolog, release_date, end_date, movie_status } = movieData

    if (!post || ! title || !genre || !prolog || !release_date || !end_date || !movieData){
        const err = new Error('필수 입력 값을 입력하지 않았습니다.')
        err.status = 400
        throw err
    }

    if ( new Date(release_date) >= new Date(end_date)){
        const err = new Error('개봉일이 종영일보다 늦을 수 없습니다.')
        err.status = 400
        throw err
    }

    const [result] = await db.query('insert into movie (post, title, genre, prolog, release_date, end_date, movie_status) values (?, ?, ?, ?, ?, ?, ?)', 
                                    [post, title, genre, prolog, release_date, end_date, movie_status])
    
                                
    const newMovie = {
        movie_id: result.insertId,
        post,
        title,
        genre,
        prolog,
        release_date,
        end_date,
        movie_status
    }         
    
    return movieData
}

// 영화 수정
exports.updateMovie = async (id, movieData) => {
    const existingMovie = await existMovie(id)
    const update = {...existingMovie, ...movieData}

    if (new Date(update.release_date) >= new Date(update.end_date)){
        const err = new Error('개봉일이 종영일보다 늦을 수 없습니다.')
        err.status = 400
        throw err
    }

    const [rows] = await db.query(
        'update movie set post = ?, title = ?, genre = ?, prolog = ?, release_date = ?, end_date = ?, movie_status = ? where movie_id = ?',
        [updated.post, updated.title, updated.genre, updated.prolog, updated.release_date, updated.end_date, updated.movie_status, id]
    )

    return {movie_id: id, ...update}
}

//영화삭제
exports.deleteMovie = async (id) =>{
    const existingMovie = await existMovie(id)

    await db.query('delete from movie where id = ?', [id])

    return {message: '해당 영화가 삭제 되었습니다.'}
}