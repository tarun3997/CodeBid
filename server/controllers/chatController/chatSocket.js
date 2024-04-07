const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });


  io.use((socket, next) => {
    const authToken = socket.handshake.auth.authToken;
    try {
      const claims = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
      if (!claims) {
        return next(new Error("Unauthorized"));
      }
      socket.authenticatedUserId = claims.id;
      next();
    } catch (err) {
        console.log(err)
      return next(new Error("Unauthorized"));
    }
  });
  io.on("connection", (socket) => {
    
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`user with id-${socket.id} joined room - ${roomId}`);
    });

    socket.on("user-message", async ({receiverId, text}) => {      
      // console.log(data)
      // socket.to(data.receiverId).emit("user-message", { data});
      try {
        const senderId = socket.authenticatedUserId;
        await global.prisma.message.create({
          data: {
            senderId,
            receiverId,
            text,
          },
        }); 
        socket.broadcast.emit('user-message', text)


      } catch (e) {
        console.error("Error saving message to database:", e);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}

module.exports = initializeSocket;
