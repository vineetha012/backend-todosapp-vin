const express = require('express');
const router = express.Router()
const { body, validationResult, Result } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.SECRET;
const User = require('../models/user')
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const { username, password } = req.body;
       
        const userExist = await User.findOne({ username: username })
        if (!userExist) {
            return res.status(400).send(
                'User is not exist'
            )
        }
        const comparing = await bcrypt.compare(password, userExist.password)
        console.log(comparing);
        if (!comparing) {
            return res.status(400).send("Invalid password credentials")
        }
        let payload = {
            user:{
                id: userExist.id
            }
           
        }
        jwt.sign(payload, secret, { expiresIn: 60 * 60 }, (err, token) => {
            if (err) throw err
            return res.json({
                status: "Success",
                message: "User signed In successfully",
                token
            })
        })
        
    } catch (error) {
        return res.status(500).json({
            status: "Error catched",
            error: error.message
        })
    }
})
module.exports = router;