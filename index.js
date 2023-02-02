const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const register = require('./routes/rigester')
const signIn = require('./routes/login')
const home = require('./routes/home')

const createTodo=require('./routes/createtodo')
//bodyParser = { json: {limit: '50mb', extended: true}, urlencoded: {limit: '50mb', extended: true} };

const cors=require('cors')
app.use(cors())
let port = process.env.PORT || 5000
const secret = process.env.SECRET;
let mongoUri = process.env.MONGO
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect("mongodb://localhost/todosvinitha",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('mongoose is connected...'))
    .catch((err) => console.log(err))



app.use('/v1/register', register)
app.use('/v1/signIn', signIn)
app.use('/v1/home', home)
app.use('/v1/createTodo',createTodo)

app.listen(port, () => console.log(`server is up at 5000 port....`)) 
