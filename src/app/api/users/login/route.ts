import {connect} from '@/dbConfig/dbConfig'
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

connect();

export async function POST(request:NextRequest){
    try {
        const reqbody=await request.json();
        console.log(reqbody);
        const {email,password}=reqbody;

        const user=await User.findOne({email});
        if(!user){
            alert("email doesn't exist")
            return NextResponse.json({error:"User With this email doesn't exist"},{status:400})
        }

        const validPassword= await bcryptjs.compare(password,user.password);
        if(!validPassword){
            alert("Password doesnt match");
            return NextResponse.json({error:"Your password doesn't match with the email"},{status:400});
        }

        const tokendata={
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token=await jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:"1d"});
        const response=NextResponse.json({
            message:"Login Successfull",
            status:true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response;

    } catch (error : any) {
        console.log("error occured while login the user",error.message);
        return NextResponse.json({error:error.message},{status:400});
    }
}