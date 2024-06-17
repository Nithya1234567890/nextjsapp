"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router=useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled,setButtonDisabled]=useState(true);
  const [loading,setLoading]=useState(false);

  const onSignUp = async() => {
    try {
      setLoading(true);
      const response=await axios.post('/api/users/signup',user);
      console.log("SignUp Successful",response.data);
      toast.success("success")
      router.push('/login')
    } catch (error: any) {
      console.log("signup failed",error.message);
      toast.error(error.message)
    } finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(user.username.length>0 && user.password.length>0 && user.email.length>0){
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  },[user])

  return (
    <div
      style={{ height: "100vh" }}
      className="flex gap-6 flex-col justify-center items-center p-3 border border-red-400 text-3xl"
    >
      <h1 className=" text-5xl">{loading?"Processing":"SignUp"}</h1>
      <hr />
      <div className="username flex flex-wrap gap-6 justify-end items-center">
        <label className="" htmlFor="username">
          UserName:
        </label>
        <input
          id="username" className="p-2 border border-slate-800 rounded-md bg-slate-200 text-black focus:outline-none focus:bg-blue-100"
          type="text"
          placeholder="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
      <div className="email flex flex-wrap gap-24">
        <label className="" htmlFor="email">
          Email:
        </label>
        <input
          className="p-2 border border-slate-800 rounded-md bg-slate-200 text-black focus:outline-none focus:bg-blue-100"
          type="email"
          id="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="password flex flex-wrap gap-7 justify-end items-center">
        <label className="" htmlFor="password">
          Password:
        </label>
        <input
          className="p-2 border border-slate-800 rounded-md bg-slate-200 text-black focus:outline-none focus:bg-blue-100"
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <button disabled={buttonDisabled} className="signup-btn text-2xl m-4 p-3 border outline-none rounded-md border-black bg-blue-100 transition-all hover:bg-blue-200 cursor-pointer" onClick={onSignUp}>{buttonDisabled?"no SignUp":"SignUp"}</button>
      <p className="text-gray-500">Already have an account? <Link href="/login" className=" text-2xl text-blue-400 underline">Login Here</Link></p>
    </div>
  );
}
