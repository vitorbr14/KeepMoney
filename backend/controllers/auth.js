const User = require('../models/User')



const register = async (req,res) => {
   const user = await User.create(req.body)
    res.send({user})
 }

 const login = async (req,res) => {
    res.send('login')
 
 }

 module.exports = {
    register,
    login
 }