import { MdDashboard } from "react-icons/md"; 
import Image from "next/image";
import {
  FaHome,
  FaCog,
  FaQuestionCircle,
  FaUpload,
} from "react-icons/fa";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-screen flex">
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
          <SideNavItem icon={<MdDashboard color="white"/> } name={"Dashboard"} link={"/admin/dashboard"}/>
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
