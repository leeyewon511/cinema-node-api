require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000


const movieRoute = require('./src/routes/movieRoute')
const cinemaRoute = require('./src/routes/cinemaRoute')
const screenRoute = require('./src/routes/screenRoute')
const seatRoute = require('./src/routes/seatRoute')
const scheduleRoute = require('./src/routes/scheduleRoute')
const reservationRoute = require('./src/routes/reservationRoute')
const authRoute = require('./src/routes/authRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/movies', movieRoute)
app.use('/cinemas', cinemaRoute)
app.use('/screens', screenRoute)
app.use('/seats', seatRoute)
app.use('/schedules', scheduleRoute)
app.use('/reservations',reservationRoute)
app.use('/api', authRoute)

app.listen((port), () =>{
    console.log('서버 실행 중')
})