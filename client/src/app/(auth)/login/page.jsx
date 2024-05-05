"use client"


import CustomInput from "@/components/customInput";
import CustomBtn from "../../../components/customButton";
import bg from "../../../../public/login.jpg";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const submit = async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:4000/auth/login',{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            if (response.ok) {
              const data = await response.json();
              // console.log(data)
              localStorage.setItem("authToken", data.token)
              router.push(data.role === 'ADMIN' ? '/admin' : '/');
            } else {
                console.error('Invaild Creditail');
                setError('Invaild Creditail')
            }
        }catch(e){
            console.error('Error occurred:', e);
        }
    }
  return (
    <div className="bg-gray-900 h-screen w-full flex justify-center items-center">
      <div className="bg-login-bg w-4/5 h-4/5 flex ">
        <div className="w-3/6  flex justify-center items-center">
            <form onSubmit={submit}>
          <div className="flex flex-col">
            <div className="flex justify-start flex-col mb-10">
              <span className="font-bold text-white text-4xl">Login</span>
              <span className="text-white text-sm mt-2">
                See your growth and get consulting support!
              </span>
            </div>
            <span className="text-white text-sm">Email*</span>
            <CustomInput type={'email'} placeholder={""} onChanges={e=> setEmail(e.target.value)}/>
            <span className="text-white text-sm mt-4">Password*</span>
            <CustomInput type={'password'} placeholder={""} onChanges={e=> setPassword(e.target.value)}/>
            <div className="flex justify-between items-center">
            <span className="text-red-600 text-xs text-right p-2 cursor-pointer font-bold">{error}</span>
            <span className="text-white text-xs text-right p-2 cursor-pointer font-bold">Reset password?</span>
            </div>
            <div className="h-5"></div>
            <CustomBtn value={"Login"} />
            <div className="flex">
            <span className="text-white text-xs p-2">Don't have an account?</span>
            <Link href="/signup">
            <span className="text-white text-xs font-bold pt-2 cursor-pointer">Sign Up</span>
            </Link>
            </div>
          </div>
          </form>
        </div>
        <div
          className="w-3/6"
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
}
