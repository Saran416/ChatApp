import express from 'express'
import userModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'
import validator from 'validator'

const userRouter = express.Router()

//register user
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

        res.status(200).json({_id: user._id, name, email})
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

//login user
userRouter.post("/login", async (req,res)=>{
    try{
        const {email, password} = req.body;

        if (!email || !password){
            return res.status(400).json("All fields are required..")
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json("Invalid mail or password...");  
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return res.status(400).json("Invalid mail or password...")
            
        }  

        res.status(200).json({_id: user._id, name: user.name, email})
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

//get a particular user
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

//get all users
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