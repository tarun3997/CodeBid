import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfileDropdown({profileImage, email}) {
    const handelLogout= async()=>{
        try{
            await axios.post('http://localhost:4000/auth/logout')
            localStorage.removeItem('authToken');
            window.location.href = '/welcome';
        }catch(e){
            console.error('Error occurred:', e);
        }
    }
    const router = useRouter()
    const handelRoute =()=>{
      router.push('/profile')
    }
    // console.log(profileImage)
  return (
    <div className="">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
          isBordered color="success"
            as="button"
            className="transition-transform"
            src= {`http://localhost:4000${profileImage}`}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{email}</p>
          </DropdownItem>
          <DropdownItem key="profile" onClick={handelRoute}>
            Profile
          </DropdownItem>
          <DropdownItem key="team_settings"><Link href={'/profile/setting'}> Team Settings</Link></DropdownItem>
          <DropdownItem key="analytics">
            Analytics
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={handelLogout}>
            
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
    </div>
  );
}
