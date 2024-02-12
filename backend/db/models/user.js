const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  userId: {
    type: Number
  },
  name: {
      type: String,
      required: [true, 'Name is required!']
  },
  surname: {
      type: String,
      required: [true, 'Surname is required!']
  },
  password: {
      type: String,
      required: [true, 'Password is required!']
  },
  sex: {
    type: String
  },
  userPhoto: {
      type: String
  },
  friends: [{
      type: Number,
      ref: 'User'
  }]
})

userSchema.pre("save", function (next){
  const user = this

  if (this.isModified("password") || this.isNew){
    bcrypt.genSalt(10, function (saltError, salt){
      if(saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash){
          if(hashError){
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  }else{
    return next()
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User