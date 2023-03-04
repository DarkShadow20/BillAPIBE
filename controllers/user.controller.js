const bycrypt= require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require("../models/userModel");
require('dotenv').config()
const secret = process.env.SECRET

const getUsers=async(req,res)=>{
  try{
    let users=await User.find({})
    users=users.map((user)=>{
      user.password=undefined;
      return user;
    })
    res.json({success:true , users})
  }catch(err){
    console.log(err.message)
    res.status(500).json({
      success:false,
      message:"Unable to get Users list",
      errMessage:err.message
    })
  }
}

const findUser=async(req,res)=>{
  const {email,password}=req.body;
  console.log(email,password,secret)
  const userInfo=await User.findOne({email})
  try{
    if(userInfo){
        const passwordCheck=bycrypt.compare(password, userInfo.password)
        if(!passwordCheck){
            return res.status(400).json({
                message: "Passwords does not match",
                error,
              });
        }
        const token = jwt.sign(
            {
              userId: userInfo._id,
              userEmail: userInfo.email,
            },
            secret,
            { expiresIn: "24h" }
          );
          res.status(200).send({
            message: "Login Successful",
            email: userInfo.email,
            token,
          });
    }
  }catch(e){
    res.status(500).json({
        success:false,
        message:"Unable to get Users list",
        errMessage:e.message
      })
  }
}

const addUser=async(req,res)=>{
  try{
    const userData=req.body
    const emailExists=await User.exists({email:userData.email})
    if(emailExists){
      res.status(401).json({
        success:false,
        message:"Email already exists"
        })
        return emailExists;
    }
    const salt = await bycrypt.genSalt(10);
    userData.password= await bycrypt.hash(userData.password,salt)
    let newUser=new User(userData);
    await newUser.save();
    const user={_id:newUser._id,name:newUser.name}
    res.status(201).json({success:true,user})
  }catch(err){
    res.status(500).json({
      success:false,
      message:"Could not add the user.Try Again!",
      errMessage:err.message
    })
  }
};

module.exports={
  getUsers,
  findUser,
  addUser
};