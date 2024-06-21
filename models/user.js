const mongoose = require("mongoose");
const {createHmac, randomBytes}= require('crypto');
const {createTokenForUser} = require('../service/auth');


const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  salt:{
    type: String,
  },
  password:{
    type: String,
    required: true,
  },
  
  role:{
    type: String,
    enum:["USER","ADMIN"],
    default:"USER",
  }
},{timestamps: true});

//hashing the password
userSchema.pre("save", function (next){
  const user=this;
  if(!user.isModified('password')) return;

  const salt= randomBytes(16).toString();   //random string
  const hashedPassword = createHmac("sha256",salt)
  .update(user.password)
  .digest("hex");

  this.salt= salt;
  this.password= hashedPassword;
  next();
});


//virtual function for signin
userSchema.static('matchPasswordAndGenerateToken',async  function(email, password){
  const user= await this.findOne({email});
  if(!user) throw new Error("No such user found");

  const salt=user.salt;
  const hashedPassword = user.password;

  const userProvidedHash= createHmac("sha256",salt)
  .update(password)
  .digest("hex");

  if(hashedPassword!== userProvidedHash) throw new Error("Password is incorrect");
  const token = createTokenForUser(user);
  return token;

})

const User= mongoose.model("user",userSchema);

module.exports = User;