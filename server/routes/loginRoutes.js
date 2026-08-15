const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/",async(req,res)=>{
  const { email,password }=req.body;

  if(!email||!password){
    return res.status(400).json({
      success:false,
      message:"Please fill all fields"
    });
  }

  try{
    const [users]=await db.query(
      "SELECT id,name,email,role FROM users WHERE email=? AND password=?",
      [email,password]
    );

    if(users.length===0){
      return res.status(401).json({
        success:false,
        message:"Invalid email or password"
      });
    }

    res.json({
      success:true,
      message:"Login successful",
      user:{
        id:users[0].id,
        name:users[0].name,
        email:users[0].email,
        role:users[0].role
      }
    });
  }catch(error){
    console.error("Login error:",error);
    res.status(500).json({
      success:false,
      message:"Database error"
    });
  }
});

module.exports=router;