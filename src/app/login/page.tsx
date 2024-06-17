"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router=useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled,setButtonDisabled]=useState(true);
  const [loading,setLoading]=useState(false);

  const onLogin = async() => {
    try {
      setLoading(true);
      const response=await axios.post("/api/users/login",user);
      console.log("Login Successfull",response.data);
      toast.success("success");
      router.push('/profile');
      
    } catch (error:any) {
      console.log("error occured while login");
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
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
      <h1 className=" text-5xl">{loading?"proccessing":"Login"}</h1>
      <hr />
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
      <button className="Login-btn text-2xl m-4 p-3 outline-none border rounded-md border-black bg-blue-100 transition-all hover:bg-blue-200 cursor-pointer" onClick={onLogin}>{buttonDisabled?"No Login":"Login"}</button>
      <p className="text-gray-500">Dont have an account <Link href="/signup" className=" text-2xl text-blue-400 underline">SignUp Here</Link></p>
    </div>
  );
}
