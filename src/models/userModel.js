import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please Provide Username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please Provide Email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please Provide Password"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    verifytoken:String,
    verifytokenexpiry:Date,
    forgotpassword:String,
    forgotpasswordexpiry:Date
})

const User=mongoose.models.users || mongoose.model("users",userSchema);

export default User