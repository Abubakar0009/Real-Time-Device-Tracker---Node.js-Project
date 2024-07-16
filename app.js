// const express = require ("express");
// const app = express()
// const http = require ("http");
// const socketio = require("socket.io");
// const path = require("path");

// const server = http.createServer(app);
// const io = socketio(server)

// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname,"public")));

// io.on("connection",(socket)=>{
//     socket.on("send-location", (data)=>{
//         io.emit("recive-location", {id:socket.id, ...data})
//     });
    
//     socket.on("disconnect", ()=>{
//         io.emit("user-disconnected", socket.id);
//     })
//     ;})
// app.get("/", (req, res) => {

//     res.render("index")
// })

// server.listen(3000, ()=>{console.log("app is runnning on port 3000");})


const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id);
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
