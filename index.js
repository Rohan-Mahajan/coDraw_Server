const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const isDev = app .settings.env === 'development'
const URL = isDev ? 'http://localhost:5000/' : 'https://co-draw-eta.vercel.app/'
app.use(cors({origin: URL}))
const httpServer = createServer(app);
const io = new Server(httpServer, { cors:URL });
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