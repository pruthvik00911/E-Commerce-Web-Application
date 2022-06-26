const express = require('express')
const route = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticate = require('../../middleware/authentication')

//importing user schema
const User = require('../../Models/Schemas/user')

const encodePass = async (pass) => {
    try {
        return bcrypt.hash(pass,10)
    } catch (error) {
        console.log("error while encoding the password")
    }
}

route.post('/register',async (req, res)=> {
    try {
        req.body.password = await encodePass(req.body.password)
        
        //storing user to the database
        const user = await User.create({
            firstName : req.body.firstname,
            lastName : req.body.lastname,
            email : req.body.email,
            password : req.body.password
        })

        // // Creating a token
        // const token = jwt.sign({
        //     userId : user._id,
        //     email : req.body.email
        // },
        // process.env.JWT_SECRET,{
        //     expiresIn : "2h"
        // })

        // // saving user token to the database
        // user.token = token

        res.status(201).json({ message : "User Successfully Registered", success : true, user : user})
    } catch (err) {
        res.status(401).json({ message : "User Not Registered" + err, success : false})
    }
})

route.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({ email : req.body.email})
        if (user !== null){
            const passResult = await bcrypt.compare(req.body.password, user.password)
            if (passResult) {

                // Creating a token
                const token = jwt.sign({
                    userId : user._id,
                    email : req.body.email
                },
                process.env.JWT_SECRET)

                // saving user token to the database
                res.cookie("jwttoken", token,{
                    httpOnly : true
                })

                res.cookie("name", user.firstName,{
                    httpOnly : true
                })

                res.status(200).json({ message : "Logged In Succesfully", success : true, user: user})
            }
            else{
                res.status(401).json({ message : "Incorrect Password", success : false})
            }
        }else{
            res.status(401).json({message : "Incorrect Username", success : false})
        }
        
        
    } catch (err) {
        console.log("Error Generated while login" + err);
    }
})

route.get('/logout', authenticate, (req, res)=>{
    try {
        res.clearCookie('jwttoken')
        res.clearCookie('name')
        res.status(200).json({ message: "Logged out", success:true})
    } catch (err) {
        console.log("Error while logging out")
        res.status(401).json({ message: "Logging out error", success:false})
    }
})

module.exports = route