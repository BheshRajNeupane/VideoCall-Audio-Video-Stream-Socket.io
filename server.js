const express = require("express");
const app = express();
const server = require('http').Server(app);
const io= require('socket.io')(server)
const {v4:uuidV4}= require('uuid');

io.on('connection',socket=>{
     socket.on('join-room',(roomId,userId)=>{
         //new user join in videoCall
         socket.join(roomId)
         //send msg to room currently join to every one in room expect who conntect.
         socket.emit('user-connected',userId);

         socket.on('disconnect',()=>{
             console.log("disconnected.. user:s",userId);
            socket.emit('user-disconnected',userId);
         })
        })
        
})

server.listen(2003);