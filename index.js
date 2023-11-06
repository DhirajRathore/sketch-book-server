const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

const app = express();
const URL =
  app.settings.env === "development"
    ? "http://localhost:3000"
    : "https://sketch-book-8q84-c82gop1kf-dhiraj-singh-rathores-projects.vercel.app";
app.use(cors({ origin: URL }));

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: URL,
});

io.on("connection", (socket) => {
  console.log("server connected");

  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
  });

  socket.on("drawLine", (arg) => {
    socket.broadcast.emit("drawLine", arg);
  });

  socket.on("changeConfig", (arg) => {
    socket.broadcast.emit("changeConfig", arg);
  });
});

httpServer.listen(5000);
