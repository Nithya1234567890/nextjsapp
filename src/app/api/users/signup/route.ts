import {connect} from '@/dbConfig/dbConfig'
import Link from 'next/link'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

connect();

export async function POST(request: NextRequest){
    try {
        const reqbody=await request.json();
        console.log(reqbody);
        const {username,email,password}=reqbody;

        const user= await User.findOne({email});
        if(user){
            return NextResponse.json({error:"User already exists"},{status:400});
        }

        const salt=await bcryptjs.genSalt(10);
        const hashPassword= await bcryptjs.hash(password,salt);

        const newuser=new User({
            username,
            email,
            password:hashPassword
        })
        const savedUser=await newuser.save();
        console.log(savedUser);
        return NextResponse.json({message:"user Created successfully",success:true,savedUser});

    } catch (err : any) {
        console.log("error while creating user",err.message)
        return NextResponse.json({error:err.message},{status:201})
    }
}