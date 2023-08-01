import { Router } from "express"
import Transaction from "../models/transaction.js"

const router = new Router();

router.get("/:id",async (req,res) => {
    const transactions =await Transaction.find({"user":req.params.id}).sort({createdAt : -1})
    res.json({data : transactions})
})

router.post("/:id",async (req,res) => {
    const {amount,details,date} = req.body
    const transaction =await Transaction.create({
        amount,
        details,
        date,
        user:req.params.id
    })
    await transaction.save()
    res.json({message : "success"})
})

router.delete("/:id",async (req,res) => {
    await Transaction.findOneAndDelete({ _id:req.params.id})
    res.json({message:"success"})
})

router.patch("/:userid/:id",async (req,res) => {
    await Transaction.updateOne({ _id:req.params.id},{$set : req.body})
    res.json({message:"success"})
})

export default router