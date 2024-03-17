"use client"

import { MdDashboard } from "react-icons/md"; 
import Image from "next/image";
import {
  FaHome,
  FaCog,
  FaQuestionCircle,
  FaUpload,
} from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {
  const [userRole, setUserRole] = useState('USER')
  useEffect(()=>{
    const isAdminLogin = async ()=>{
      try{
        const isAdmin = await axios.get("http://localhost:4000/api/user-role",{
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        })
        setUserRole(isAdmin.data)
        console.log(isAdmin.data)
      }catch(e){
        console.error("Error fetching user count:", e);
      }
    };
    isAdminLogin()
  },
  [])

  return (
    <div className="h-screen flex fixed">
      <div className="w-full h-full bg-[#28274d] flex flex-col items-start">
        <Image
          className="mt-5 p-4"
          src="/logo.png"
          width={150}
          height={150}
          alt="Logo"
        />
        <div className="h-4"></div>
        <div className="w-full p-4">
          <span className="text-start text-lg text-white font-bold">Menu</span>
          {userRole === 'ADMIN' &&
            <SideNavItem icon={<MdDashboard color="white"/> } name={"Dashboard"} link={"/admin/dashboard"}/> 
          }
          <SideNavItem icon={<FaHome color="white"/>} name={"Home"} link={"/"}/>
          <SideNavItem icon={<FaUpload color="white"/>} name={"Upload"} link={"/upload-project"}/>
          
          <SideNavItem icon={<FaCog color="white"/>} name={"Settings"} link={"/"}/>
          <SideNavItem icon={<FaQuestionCircle color="white"/>} name={"Help"} link={"/"}/>
        </div>
      </div>
    </div>
  );
}

export function SideNavItem({ name, icon, link }) {
  return (
    <Link href={link}>
    <div className="flex items-center gap-4 mt-8 cursor-pointer">
      {icon }
      <span className="text-white">{name}</span>
    </div>
    </Link>
  );
}
