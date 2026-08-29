const db = require('../db')

const existCinema = async (id) => {
    const [rows] = await db.query('select * from cinema where cinema_id = ?', [id])

    if (rows.length === 0){
        const err = new Error('해당 영화관을 찾을 수 없습니다.')
        err.status = 404
        throw err
    }

    return rows[0]
 }

 // *****회원*****

 // 영화관 목록조회
 exports.getCinema = async () => {
    const [rows] = await db.query('select * from cinema')
    return rows
 }

 // 영화관 상세조회
 exports.getCinemaDetail = async (id) => {
    const existingCinema = await existCinema(id)
    return existingCinema
 }


 // *****관리자*****
 
 // 영화관 등록
 exports.postCinema = async (cinemaData) => {
    const {name, address, phone} = cinemaData

    if (!name || !address || !phone) {
        const err = new Error('필수 값을 입력하지 않았습니다.')
        err.status = 400
        throw err
    }

    const [exist] = await db.query('select * from cinema where name = ? and address = ? ', [name, address])

    if(exist.length > 0) {
      const err = new Error('이미 등록된 영화관입니다.')
      err.status = 409
      throw err
    }

    const [result] = await db.query('insert into cinema (name, address, phone) values (?, ?, ?)', [name, address, phone])


   
    const newCinema = {
        cinema_id: result.insertId,
        name,
        address,
        phone
    }

    return newCinema
 }

 // 영화관 수정
 exports.updateCinema = async (id, cinemaData) => {
    const existingCinema = await existCinema(id)
    const update = {...existingCinema, ...cinemaData}

    const [result] = await db.query('update cinema set name = ?, address = ?, phone = ? where cinema_id = ?', [update.name, update.address, update.phone, id] )
    
    return {cinema_id: id, ...update}
 }

 // 영화관 삭제
 exports.deleteCinema = async (id) => {
    const existingCinema = await existCinema(id)

    await db.query('delete from cinema where cinema_id = ?', [id])

    return {message: '해당 영화관이 삭제되었습니다.'}
 }