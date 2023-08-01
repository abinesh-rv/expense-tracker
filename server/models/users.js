import mongoose from "mongoose"

const userSchema =new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,unique:true},
    password:{type:String}
})

export default new mongoose.model("users",userSchema)