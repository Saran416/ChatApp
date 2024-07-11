import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    text: String,
},{
    timestamps: true
})

const messageModel = mongoose.model('messages',messageSchema)

export default messageModel