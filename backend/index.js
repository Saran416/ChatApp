import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongodbURL } from './config.js';
import userRouter from './Routes/userRoute.js';
import chatRouter from './Routes/chatRoute.js';
import messageRouter from './Routes/messageRoute.js';
import http from 'http';
import { Server } from 'socket.io'; // Import Server from socket.io

const app = express();

mongoose.connect(mongodbURL).then(()=>{
    console.log("Successfully connected to the database");
}).catch((err)=>{
    console.log("MongoDB connection failed: ", err.message);
});

app.use(express.json());
app.use(cors());
app.use('/api/users', userRouter);
app.use('/api/chats', chatRouter);
app.use('/api/messages', messageRouter);

const server = http.createServer(app);

const io = new Server(server, {cors: "*"});

// let onlineUsers = [];

io.on("connection", (socket) => {
    // socket.on("addNewUser", (userId) => {
    //     if (!(onlineUsers.some(user => user.userId == userId))) {
    //         onlineUsers.push({userId, socketId: socket.id});
    //         io.emit("getOnlineUsers", onlineUsers); // Emit only when new user is added
    //     }
    //     console.log(onlineUsers);
    // });

    // socket.on("disconnect", () => {
    //     onlineUsers = onlineUsers.filter(user => user.socketId != socket.id);
    //     io.emit('getOnlineUsers', onlineUsers); // Correct variable name
    // });

    socket.on('sendMessage', (message) => {
        io.emit("getMessage", message);
    });
});


server.listen(PORT, () => {
    console.log(`Listening on the port ${PORT}`);
});
