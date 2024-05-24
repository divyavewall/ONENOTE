const express = require("express");
const socket = require("socket.io");

const app = express();
app.use(express.static("frontend"));
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});

let io = socket(server);
io.on("connection", (socket) => {
    console.log("made socket connection");

    socket.on("beginPath", (data) => {
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })

    socket.on("redoUndo", (data)=>{
        io.sockets.emit("redoUndo", data);
    })
})