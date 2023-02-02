const express=require('express')
const router=express.Router()

const registerUser=require('../models/user')
const miiddleware = require('./middleware')
const todomodel=require('../models/todoschema')
const { route } = require('./rigester')

router.get('/', miiddleware, async (req, res) => {
    try {
        //console.log(req.user.id)
        let exist = await registerUser.findById(req.user.id) //from middleware
        if (!exist) {
            return res.status(400).send('user not found')
        }
        let userref=req.user.id
        const alltodos=await todomodel.find({userref:userref})
       // console.log(alltodos)
        res.json({
            username:exist.username,
            data:alltodos
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send('server Error')
    }
})
router.put('/:id/:updatedval',async(req,res)=>{
    try {
        console.log(req.params)
        const id=req.params.id
        const updatedval=req.params.updatedval
        console.log(id,updatedval)
        const existtodo=await todomodel.findByIdAndUpdate(id,{status:updatedval})
        console.log(existtodo)
    } catch (error) {
        
    }
})
router.put('/time/:id/:status/:time',async(req,res)=>{
    try {
        console.log(req.params)
        const id=req.params.id
        const time=req.params.time
        const updatedval=req.params.status
        console.log(id,updatedval)
        const existtodo=await todomodel.findByIdAndUpdate(id,{status:updatedval,timetaken:time})
        console.log(existtodo)
    } catch (error) {
        
    }
})
module.exports=router