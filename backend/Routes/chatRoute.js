import chatModel from "../Models/chatModel.js";
import express, { response } from 'express'

const chatRouter = express.Router()

//create chat
chatRouter.post('/', async(req,res)=>{
    const {firstId, secondId} = req.body
    try{
        const chat = await chatModel.findOne({
            members: {$all: [firstId,secondId]}
        })

        if(chat){
            return res.status(200).json(chat)
        }
        
        const newChat = new chatModel({
            members : [firstId,secondId]
        })

        const respose = await newChat.save()

        return res.status(200).json(newChat)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

//getuserchats
chatRouter.get('/:userId', async(req,res)=>{
    const userId = req.params.userId
    try{
        const chats = await chatModel.find({
            members : {$in: [userId]}
        })

        return res.status(200).json(chats)
    }
    catch(err){
        console.log(err)
        res.send(500).json(err)
    }
})

//findchat
chatRouter.get('/find/:firstId/:secondId', async(req,res)=>{
    const {firstId, secondId} = req.params;
    try{
        const chat = await chatModel.findOne({
            members : {$all: [firstId, secondId]}
        })

        return res.status(200).json(chat)
    }
    catch(err){
        console.log(err)
        res.send(500).json(err)
    }
})


export default chatRouter