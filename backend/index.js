import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { PORT, mongodbURL } from './config.js'
import userRouter from './Routes/userRoute.js'
import chatRouter from './Routes/chatRoute.js'
import messageRouter from './Routes/messageRoute.js'

const app = express()

mongoose.connect(mongodbURL).then(()=>{
    console.log("Successfully connected to the database")
}).catch((err)=>{
    console.log("MongoDB connection failed: ", err.message)
})

app.use(express.json())
app.use(cors())
app.use('/api/users', userRouter)
app.use('/api/chats',chatRouter)
app.use('/api/messages',messageRouter)

app.listen(PORT, ()=>{
    console.log(`Listening on the port ${PORT}`)
})