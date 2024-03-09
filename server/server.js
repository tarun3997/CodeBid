require('dotenv').config()
const express = require('express')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const projectRouter = require('./routes/projectRoutes')

const app = express()
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))
app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.use('/auth',authRoutes)
app.use('/admin',adminRoutes)
app.use('/api',userRoutes)
app.use('/api',projectRouter)

// app.use(authenticateToken)

app.listen(4000,()=>{
    console.log('server started')
})