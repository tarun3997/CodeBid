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
    console.log(authToken)
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
    });

    socket.on("user-message", async ({ receiverId, text }) => {
      try {
        const senderId = socket.authenticatedUserId;
        const message = await global.prisma.message.create({
          data: {
            senderId,
            receiverId,
            text,
          },
        });
        console.log("Message saved to database:", message.id);
        io.to(senderId).to(receiverId).emit("message", message);
        console.log(message);
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
