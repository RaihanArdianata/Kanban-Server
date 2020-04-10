require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const router = require('./routes')
const errhandler = require('./middleware/errhandling')
const PORT = process.env.PORT

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(router)

app.use(errhandler)

app.listen(PORT, (req, res)=>{
    console.log('listen port ', PORT);
    
})