"use client"
import { useRouter } from "next/navigation"
import { NextResponse } from "next/server"
import axios from "axios"
import toast from "react-hot-toast"



export default function ProfilePage(){
    const router=useRouter();
    const onLogout=async()=>{
        try {
            await axios.get('/api/users/logout');
            toast.success("success");
            router.push('/login')

        } catch (error:any) {
            console.log("error occured while login");
            toast.error(error.message)
            return NextResponse.json({error:error.message},{status:500})
        }
    }

    return(
        <div className="flex flex-col justify-center gap-8 items-center min-h-screen">
            <h1 className="text-5xl">Profile</h1>
            <p className="text-3xl">Profile Page</p>
            <button onClick={onLogout} className=" transition-all cursor-pointer bg-blue-200 hover:bg-blue-300 p-3 rounded-md border border-black">Logout</button>
        </div>
    )
}