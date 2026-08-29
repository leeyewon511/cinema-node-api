const db = require('../db')

// 스케줄 존재 여부
const existSchedule = async (id) => {
    const [rows] = await db.query('select * from schedule where schedule = ?', [id])

    if(rows.length === 0) {
        const err = new Error('해당 스케줄이 존재하지 않습니다.')
        err.status = 404
        throw err
    }

    return rows[0]
}

// 특정 스케줄 좌석 상태 조회
exports.getScheduleSeat = async(scheduleId) => {
    // 1. 조회할 스케줄 id를 받는다.
    // 2. 해당 id의 스케줄이 db에 존재하는지 확인한다.
    // 2-1. 해당하지 않을 시 해당 스케줄이 존재하지 않음을 반환한다.

    await existSchedule(scheduleId)

    // 3. 해당 스케줄에 속한 좌석 목록(schedule_seat)과 실제 좌석 정보(seat)를 조인한다.
    // 4. 예매내역(reservation_item)과도 조인하여, 해당 좌석이 예매되었는지 여부를 확인한다.
    // 4-1. 예매내역에 이 좌석이 걸려있으면 '예약됨'으로 표시한다.
    // 4-2. 예매내역에 이 좌석이 없으면 '가능'으로 표시한다.
    // 5. 좌석을 행(row), 번호(number) 순서로 정렬하여 응답한다.

    const [rows] = await db.query(`
        select
            ss.schedule_seat,
            s.seat,
            s.seat_row,
            s.seat_number,
            case 
                when ri.schedule_seat_id is not null then '예약됨' else '가능' end as seat_status
        from schedule_seat ss join seat s on ss.seat_id = s.seat
        left join reservation_item ri on ri.schedule_seat_id = ss.schedule_seat
        where ss.schedule_id = ?
        order by s.seat_row, s.seat_number
        `, [scheduleId])

        // 6. 완성된 자석 상태 목록을 응답한다.
        return rows
}

// 스케줄 조회(조건 검색)
exports.getSchedule = async (filters) => {

    // 1. 회원이 검색 조건(영화, 날짜, 상영관)을 요청으로 보낸다. (조건은 없어도 됨)
    // 2. 요청에서 movie_id, show_date, screen_id를 꺼낸다.
    const { movie_id, show_date, screen_id } = filters

    // 3. 기본 조회 쿼리를 만든다. movie, screen, cinema를 조인하여
    //    영화 제목, 상영관 이름, 영화관 이름까지 함께 조회되도록 한다.
    let query = `
        select 
            sc.schedule,
            sc.show_date,
            sc.show_time,
            sc.schedule_status,
            m.movie_id,
            m.title as movie_title,
            m.post as movie_post,
            s.screen,
            s.screen_no,
            c.cinema_id,
            c.name as cinema_name
        from schedule sc
        join movie m on sc.movie_id = m.movie_id
        join screen s on sc.screen_id = s.screen
        join cinema c on s.cinema_id = c.cinema_id
        where 1=1
    `
    const params = []

    // 4. movie_id 조건이 있으면 쿼리에 조건을 추가한다.
    if (movie_id) {
        query += ' and sc.movie_id = ?'
        params.push(movie_id)
    }

    // 5. show_date 조건이 있으면 쿼리에 조건을 추가한다.
    if (show_date) {
        query += ' and sc.show_date = ?'
        params.push(show_date)
    }

    // 6. screen_id 조건이 있으면 쿼리에 조건을 추가한다.
    if (screen_id) {
        query += ' and sc.screen_id = ?'
        params.push(screen_id)
    }

    // 7. 조건이 하나도 없으면 전체 스케줄이, 조건이 있으면 필터링된 스케줄이 조회된다.
    const [rows] = await db.query(query, params)

    // 8. 조회된 스케줄 목록을 응답한다.
    return rows
}

// 스케줄 상세 조회
exports.getScheduleDetail = async(id) => {

    // 1. 조회할 스케줄의 id를 받는다.
    // 2. 해당 id의 스케줄이 존재하는지 확인하며, 관련 정보(영화, 상영관, 영화관)까지 함께 조회한다.
    // 2-1. 존재하지 않으면 스케줄을 찾을 수 없다는 에러를 던진다.

    const [rows] = await db.query(`
        select
            sc.schedule,
            sc.show_date,
            sc.show_time,
            sc.schedule_status,
            m.movie_id,
            m.title as movie_title,
            m.post as movie_post,
            s.screen,
            s.screen_no,
            c.cinema_id,
            c.name as cinema_name
        from schedule sc
        join movie m on sc.movie_id = m.movie_id
        join screen s on sc.screen_id = s.screen
        join cinema c on s.cinema_id = c.cinema_id
        where sc.schedule = ?
        `, [id])
        
        if (rows.length === 0) {
            const err= new Error('해당 스케줄을 찾을 수 없습니다.')
            err.status = 404
            throw err
        }
        
    // 3. 조회된 스케줄 하나(rows의 첫 번째 항목)를 응답한다.
        return rows[0]
}

// 스케줄 등록
exports.postSchedule = async(scheduleData) => {
    const {show_date, show_time, schedule_status, screen_id, movie_id} = scheduleData

    const [exist] = await db.query('select * from schedule where show_date = ? and show_time = ? and screen_id = ?',
                                [show_date, show_time, screen_id])

    if (exist.length > 0) {
        const err = new Error('다른 스케줄이 등록되어 있습니다.')
        err.status = 409
        throw err
    }

    const [result] = await db.query('insert into schedule (show_date, show_time, schedule_status, screen_id, movie_id) values (?, ?, ?, ?, ?)', 
                    [show_date, show_time, schedule_status, screen_id, movie_id])
    
    return {
        schedule: result.insertId,
        show_date,
        show_time,
        schedule_status,
        screen_id,
        movie_id
    }
}

// 스케줄 수정
exports.updateSchedule = async(scheduleId, scheduleData) => {
    const existingSchedule = await existSchedule(scheduleId)
    const update = {...existingSchedule, ...scheduleData}

    const [result] = await db.query('update schedule set show_date = ?, show_time = ?, schedule_status = ?, screen_id = ?, movie_id = ? where schedule = ?',
                    [update.show_date, update.show_time, update.schedule_status, update.screen_id, update.movie_id, scheduleId])
    
    return {screen: scheduleId, ...update}
}

// 스케줄 삭제
exports.deleteSchedule = async(scheduleId) => {
    const existingSchedule = await existSchedule(scheduleId)

    await db.query('delete from schedule where schedule = ?', [scheduleId])

    return {message: '해당 스케줄이 삭제되었습니다.'}
}