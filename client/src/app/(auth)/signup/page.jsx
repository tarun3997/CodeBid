"use client"
import CustomInput from "@/components/customInput";
import CustomBtn from "../../../components/customButton";
import bg from "../../../../public/login.jpg";
import React, {  useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/navigation";

export default function Signup() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const dataToPass = { name,username,number,email,password };
    const searchParams = new URLSearchParams(dataToPass);


    const submit = async(e)=>{
        e.preventDefault();
        router.push(`/signup/create-profile?${searchParams.toString()}`);
    }
    return (
    <div className="bg-gray-900 h-screen w-full flex justify-center items-center">
      <div className="bg-login-bg w-4/5 h-4/5 flex ">
        <div className="w-3/6  flex justify-center items-center">
            <form onSubmit={submit} className="max-w-[70%]">
          <div className="flex  flex-col">
            <div className="flex justify-start flex-col mb-10">
              <span className="font-bold text-white text-4xl">Sign Up</span>
              <span className="text-white text-sm mt-2">
                See your growth and get consulting support!
              </span>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col">
            <span className="text-white text-sm">Name*</span>
            <CustomInput  type={'text'} placeholder={""} onChanges={e=> setName(e.target.value)}/>
            </div>
            <div className="flex flex-col">
            <span className="text-white text-sm">Username*</span>
            <CustomInput  type={'text'} placeholder={""} onChanges={e=> setUsername(e.target.value)}/>
            </div>
            </div>
            <span className="text-white text-sm mt-4">Number*</span>
            <CustomInput  type={'number'} placeholder={""} onChanges={e=> setNumber(e.target.value)}/>
            <span className="text-white text-sm mt-4">Email*</span>
            <CustomInput  type={'email'} placeholder={""} onChanges={e=> setEmail(e.target.value)}/>
            <span className="text-white text-sm mt-4">Password*</span>
            <CustomInput type={'password'} placeholder={""} onChanges={e=> setPassword(e.target.value)}/>
            <div className="h-5"></div>
            <CustomBtn value={"Continue"} />
            <div className="flex">
            <span className="text-white text-xs p-2">Already have an account?</span>
            <Link href="/login">
            <span className="text-white text-xs font-bold pt-2 cursor-pointer">Login</span>
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
