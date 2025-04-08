import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
    },
  });
  export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
  }

  const userSocketMap = {};
  io.on("connection",(socket)=>{
        console.log("new connection",socket.id);
        const userId = socket.handshake.query.userId;

        if(userId) userSocketMap[userId] = socket.id;

        io.emit("getOnlineUsers",Object.keys(userSocketMap));


        socket.on("disconnect",()=>{
            console.log("disconnected",socket.id)
            delete userSocketMap[userId];
            io.emit("getOnlineUsers",Object.keys(userSocketMap));
        })

        socket.on("typing", ({ to }) => {
          // broadcast to the recipient user if they are connected
          const receiverSocketId = getSocketIdForUser(to); // your method to find user's socket
          if (receiverSocketId) {
            io.to(receiverSocketId).emit("typing", {
              from: socket.userId, // or your user identifier
            });
          }
        });
  })

  
  export { io, app, server };