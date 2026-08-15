const express = require('express')
const app = express()
const port = 3000

const movieRoute = require('./routes/movieRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/movie', movieRoute)

app.listen((port), () =>{
    console.log('서버 실행 중')
})