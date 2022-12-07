const app= require("express")();
const server = require("http").createServer(app);
const io = require('socket.io')(server)

// socket.emit will send back message to sender only,
// io.emit will send message to all the client including sender
// if you want to send message to all but not back to sender then socket.broadcast.emit

io.on('connection',(socket)=>{
    console.log("what is socket :" , socket );
    console.log("socket is active to be connected")

 socket.on("chat",(payload)=>{
        console.log("what is payload", payload)
        io.emit("chat",payload)
 })
})

// this is not going to work at here
// app.listen(5000,()=>{
//     console.log("Server is listening at port 5000...");
// })

server.listen(5000,()=>{
    console.log("Server is listening at port 5000...");
})

