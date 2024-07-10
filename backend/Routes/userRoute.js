import express from 'express'
import userModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import { JWT_SECRET_KEY } from '../config.js'

const userRouter = express.Router()

const createToken = (_id) => {
    return jwt.sign({_id},JWT_SECRET_KEY,{expiresIn: "3d"})
}

userRouter.post('/register', async(req,res)=>{
    try{
        const {name, email, password} = req.body;
        
        let user = await userModel.findOne({email})

        if(user){
            return res.status(400).json("User with given email already exists..")
        }

        if (!name || !email || !password){
            return res.status(400).json("All fields are required..")
        }

        if(!validator.isEmail(email)){
            return res.status(400).json("Not a valid email..")
        }

        if(!validator.isStrongPassword(password)){
            return res.status(400).json("Must be a strong password..")
        }

        user = new userModel({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(user.password, salt)

        await user.save()

        const token = createToken(user._id)

        res.status(200).json({_id: user._id, name, email, token})
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

userRouter.post("/login", async (req,res)=>{
    try{
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json("Invalid email or password");  
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return res.status(400).json("Invalid email or password")
            
        }  
        const token = createToken(user._id)

        res.status(200).json({_id: user._id, name: user.name, email, token})
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

userRouter.get('/find/:userId',async (req,res)=>{
    const userId = req.params.userId
    try{
        const user = await userModel.findById(userId)

        if(!user){
            return res.status(400).json("No such user")
        }

        res.status(200).json(user)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

userRouter.get('/',async(req,res)=>{
    try{
        const user = await userModel.find()
        
        if(!user){
            return res.status(400).json("No users..")
        }

        res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})


export default userRouter