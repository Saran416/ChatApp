import express from 'express'
import messageModel from '../Models/messageModel.js'

const messageRouter = express.Router()

//create message
messageRouter.post('/',async(req,res)=>{
    const {chatId, senderId, text} = req.body;
    const message = new messageModel({
        chatId,
        senderId,
        text
    })

    try{
        const response = await message.save()
        res.status(200).json(response)
    }   
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

messageRouter.get('/:chatId',async(req,res)=>{
    const {chatId} = req.params;
    try{
        const messages = await messageModel.find({chatId})
        res.status(200).json(messages)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

export default messageRouter