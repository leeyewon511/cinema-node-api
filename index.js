const express = require('express')
const app = express()
const port = 3000

const movieRoute = require('./routes/movieRoute')
const cinemaRoute = require('./routes/cinemaRoute')
const screenRoute = require('./routes/screenRoute')
const seatRoute = require('./routes/seatRoute')
const scheduleRoute = require('./routes/scheduleRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/movies', movieRoute)
app.use('/cinemas', cinemaRoute)
app.use('/screens', screenRoute)
app.use('/seats', seatRoute)
app.use('/schdules', scheduleRoute)

app.listen((port), () =>{
    console.log('서버 실행 중')
})