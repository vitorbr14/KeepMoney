const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')

const AuthSchema = new Schema({
    name: {
        type:String,
        required:[true, 'Please provide a name'],
        minLength:3,
        maxLength:50,

    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please provide a valid email',
        ],
        unique: true,
      },
      password: {
        type:String,
        required:[true, 'Please provide a password'],
        minLength:6,
       

    },
}, {timestamps: true})


AuthSchema.pre('save', async function (next) {
  //encrypt password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(this.password, salt)
  this.password = hashedPassword
  next();
});

AuthSchema.methods.createJWT = function () {
  return jwt.sign({userId:this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn:'30d'})
}

module.exports = mongoose.model('User', AuthSchema)