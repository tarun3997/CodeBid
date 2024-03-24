const { Server } = require('socket.io');

const io = new Server()

io.on("connection", (socket)=>{
    console.log('A new user has connected', socket.id)
})


export default SocketService;
