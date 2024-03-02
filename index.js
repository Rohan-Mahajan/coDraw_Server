const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors({origin: 'http://localhost:5000/'}))
const httpServer = createServer(app);
const io = new Server(httpServer, { cors:'http://localhost:5000/' });
console.log("Server Start")
io.on("connection", (socket) => {
  // ...
  console.log("Server Connected")

  socket.on('beginPath', (arg)=>{
    socket.broadcast.emit('beginPath', (arg))
  })
  socket.on('drawLine', (arg)=>{
    socket.broadcast.emit('drawLine', (arg))
  })
  socket.on('changeConfig', (arg)=>{
    socket.broadcast.emit('changeConfig', (arg))
  })
});

httpServer.listen(5000);