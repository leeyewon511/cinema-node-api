const db = require('../config/db')

// 해당 상영관 좌석 조회
exports.getSeat = async (screenId) => {
    const [existingScreen] = await db.query('select * from seat where screen_id = ?', [screenId])

    if (existingScreen.length === 0){
        const err = new Error('해당 상영관이 존재하지 않습니다.')
        err.status = 404
        throw err
    }

    return existingScreen
}

// 좌석 등록
exports.postSeat = async (seatData) => {
    const {seat_row, seat_number, screen_id} = seatData

    if (!seat_row || !seat_number || !screen_id){
        const err = new Error('필수 값을 입력하지 않았습니다.')
        err.status = 400
        throw err
    }

    const [result] = await db.query('insert into seat (seat_row, seat_number, screen_id) values (?, ?, ?)', [seat_row, seat_number, screen_id])

    const newSeat = {
        seat: result.insertId,
        seat_row,
        seat_number,
        screen_id
    }

    return newSeat
}

// 좌석 삭제
exports.deleteSeat = async(id) => {
    const [existSeat] = await db.query('select * from seat where seat = ?', [id])

    if(existSeat.length === 0){
        const err = new Error('해당 좌석이 존재하지 않습니다.')
        err.status = 404
        throw err
    }

    await db.query('delete from seat where seat = ?', [id])

    return {message: '해당 좌석이 삭제되었습니다.'}
}