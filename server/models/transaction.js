import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    amount:Number,
    details:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
    date:{type:Date, default:new Date()},
},{timestamps:true})


export default new mongoose.model("Transaction",transactionSchema)