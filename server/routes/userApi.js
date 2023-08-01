import Users from "../models/users.js" 
import { Router } from "express"
import bcrypt from "bcrypt"

const router =Router()

router.post("/login",async(req,res) => {
      const {email,password} = req.body
      const CheckUser = await Users.findOne({email})
      if(!CheckUser){
        return res.json({status:false,msg:"the email does not found,please create an account"})
      }
      const PassCompare = await bcrypt.compare(password,CheckUser.password)
      if(!PassCompare){
        return res.json({status:false,msg:"the password does not match"})
      }
      return res.json({status:true,user:CheckUser})
})

router.post("/register",async (req,res) => {
    const {username,password,email} = req.body
    const CheckEmail =await Users.findOne({email})
    if(CheckEmail){
        return res.json({status:false,msg:"the email already exists"})
    }
    const hash =await bcrypt.hash(password,10)
    const user = await Users.create({
        username,
        email,
        password:hash
    })
    await user.save()
    return res.json({status:true,user:user})
})

export default router