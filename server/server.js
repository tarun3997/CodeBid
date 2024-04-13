    require('dotenv').config()
    const express = require('express')
    const authRoutes = require('./routes/authRoutes')
    const userRoutes = require('./routes/userRoutes')
    const adminRoutes = require('./routes/adminRoutes')
    const cors = require('cors')
    const cookieParser = require('cookie-parser')
    const projectRouter = require('./routes/projectRoutes')
    const http = require('http')
    const { Server } = require('socket.io');
    const chatRouter
    = require('./routes/chatRoutes')
const initializeSocket = require('./controllers/chatController/chatSocket')
const notificationRouter = require('./routes/notificationRoutes')
                                                                

    const app = express()                                                               
    const server = http.createServer(app);
    const io = new Server(server,{
        cors:{                                                              
            origin: 'http://localhost:3000'
        }                                                               
    });                                                             
    app.use(cookieParser())
    app.use(cors({
        credentials: true,                                                              
        origin: 'http://localhost:3000'
    }))
    app.use(express.urlencoded({extended: false}));                                                             
    app.use(express.json())

    initializeSocket(server);                                                               


    app.use('/profileImages', express.static('profileImages'));
    app.use('/postedprojectImages', express.static('postedprojectImages'));

    app.use('/auth',authRoutes)
    app.use('/admin',adminRoutes)
    app.use('/api',userRoutes)
    app.use('/api',projectRouter)
    app.use('/chat/api',chatRouter)
    app.use('/notification',notificationRouter)

    // app.use(authenticateToken)

    server.listen(4000,()=>{
        console.log('server started')
    })