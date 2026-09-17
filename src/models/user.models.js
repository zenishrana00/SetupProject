import mongoose,{Schema} from 'mongoose'

import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

const userSchema=new Schema(
    {
       username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
       },
       email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
       },
       fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
       },
       avatar:{
        type:String, //cloudinary ma image upload garne ra tesle url dinxa
        required:true,
       },
       coverImage:{
        type:String, //cloudinary ma image upload garne ra tesle url dinxa
       },
       watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
       ],
       password:{
        type:String,
        required:[true,"Password is required"]
       },
       refreshToken:{
        type:String,
       }
    },
    {timestamps:true}
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password= await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)
}

// for generating access token and the same method used for refresh token as well 
userSchema.methods.generateAccessToken= function(){         // this is very fast so no need of async await // but you can use no problem
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}       
userSchema.methods.generateRefreshToken= function(){         // this is very fast so no need of async await // but you can use no problem
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.generateRefreshToken_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}             

export const User= mongoose.model("User",userSchema)