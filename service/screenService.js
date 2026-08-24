const db = require('../db')

// 상영관 존재여부
const existScreen = async (id) =>{
    const [rows] = await db.query('select * from screen where screen = ?', [id])

    if (rows.length === 0) {
        const err = new Error('해당 상영관이 존재하지 않습니다.')
        err.status = 404
        throw err
    }

    return rows[0]
}

// 상영관 목록조회
exports.getScreen = async () => {
    const [rows] = await db.query('select * from screen')
    return rows
}

// 상영관 상세조회
exports.getScreenDetail = async (id) => {
    const existingScreen = await existScreen(id)
    return existingScreen
}

// 상영관 등록
exports.postScreen = async (screenData) => {
    const {screen_no, cinema_id, seat_capacity} = screenData

    if (!screen_no || !cinema_id ) {
        const err = new Error('필수 값을 입력하지 않았습니다.')
        err.status = 400
        throw err
    }

    const [result] = await db.query('insert into screen (screen_no, cinema_id, seat_capacity) values (?, ?, ?)', [screen_no, cinema_id, seat_capacity])

    const newScreen = {
        screen: result.insertId,
        screen_no,
        cinema_id,
        seat_capacity
    }

    return newScreen
}

// 상영관 정보수정
exports.updateScreen = async (id, screenData) => {
    const existingScreen = await existScreen(id)
    const update = {...existingScreen, ...screenData}

    const [result] = await db.query('update screen set screen_no = ?, cinema_id = ?, seat_capacity = ? where screen = ?', [update.screen_no, update.cinema_id, update.seat_capacity, id])

    return {screen: id, ...update}
}

// 상영관 삭제
exports.deleteScreen = async(id) => {
    await existScreen(id)
    await db.query('delete from screen where screen = ?', [id])

    return {Message: '해당 상영관이 삭제되었습니다.'}
}