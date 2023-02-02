const express=require('express')
const todomodel=require('../models/todoschema')
const router=express.Router()
const middleware=require('./middleware')
router.post('/',middleware,async(req,res)=>{
    try {
        console.log("req.user",req.user)
        let {activity,status,timetaken,action}=req.body
        const newTodo=await todomodel.create({
            ...req.body,
            userref: req.user.id
        })
        //console.log(newTodo)
    } catch (error) {
        res.send(error)
        console.log(error.message)
    }
})
module.exports=router