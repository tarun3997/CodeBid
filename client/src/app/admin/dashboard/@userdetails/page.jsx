"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserDetails({totalUsers , newUserCount, totalProject}) {
    // const [totalUsers, setTotalUsers] = useState(0);
    // const [newUserCount, setNewUserCount] = useState(0);

    // useEffect(()=>{
    //     const fetchTotalUser = async ()=>{
    //         try{
    //             // const totalUsersResponse = await axios.get('http://localhost:4000/admin/all-user');
    //             // setTotalUsers(totalUsersResponse.data.allUser)
    //             const newUserCountResponse = await axios.get('http://localhost:4000/admin/new-user');
    //             setNewUserCount(newUserCountResponse.data.usersAddedToday)
    //         }catch(e){
    //             console.error('Error fetching user count:', error);
    //         }
    //     };
    //     fetchTotalUser();
    // }, [])
    return (
        <div className="w-[40%] flex flex-wrap h-[30%] mt-5 mb-8 rounded-2xl ">
            <UserDetailsCard color={"#7762b1"}  className={"border-b-[1px] border-r-[1px] rounded-tl-lg"} title={"Total User"} value={totalUsers}/>
            <UserDetailsCard color={"#181b26"}  className={"border-b-[1px] border-l-[1px] rounded-tr-lg"} title={"Total Post"} value={totalProject}/>
            <UserDetailsCard color={"#181b26"}  className={"border-t-[1px] border-r-[1px] rounded-bl-lg"} title={"New User"} value={newUserCount}/>
            <UserDetailsCard color={"#181b26"}  className={"border-t-[1px] border-l-[1px] rounded-br-lg"} title={"Premium Users"} value={"10"}/>
        </div>
    );
}

export function UserDetailsCard({ color,  className, title, value}) {

    return (
        <div className={`w-[50%] h-[50%] border-x-cc-color ${className} flex`} style={{ background: color }}>
            <div className="flex flex-col justify-center items-start p-4">
                <span className="text-white mb-4">{title}</span>
                <span className="text-white text-4xl">{value}</span>
            </div>
        </div>
    );
}
