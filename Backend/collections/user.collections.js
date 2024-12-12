const User = require("../model/user.model")
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const blackList_token = require("../blackList token/blackList");

const registerUser=async(req,res)=>{
   try {
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user) return res.status(401).json({msg : "User already exists"})
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const newUser = new User({...req.body,password : hashedPassword})
    await newUser.save()
    res.status(201).json(newUser)
   } catch (error) {
    res.status(501).json({msg : "Internal Server Error"})
   }
}

const loginUser=async(req,res)=>{
 try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) return res.status(401).json({msg : "User not found, Register first"})
    const storedPassword = user.password;
    const username = user.firstname
    const isPasswordMatched = bcrypt.compareSync(password,storedPassword)
    if(isPasswordMatched){
        const token = jwt.sign({userId : user._id, role : user.role},process.env.SECRET_KEY)
        return res.status(201).json({msg : "LoggedIn successfully",token,username})
    }else{
        res.status(401).json({msg : "Incorrect Password"})
    }
 } catch (error) {
    res.status(501).json({msg : "Internal Server Error"})
 }
}

const logoutUser=async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    blackList_token.push(token)
    res.send("Logged out successfully")

}

module.exports = {registerUser,loginUser,logoutUser}