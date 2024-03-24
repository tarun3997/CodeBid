"use client"

import UserDetails from "./@userdetails/page";
import UserList from "./@userlist/page";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [newUserCount, setNewUserCount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);

    useEffect(() => {
       
        fetchTotalUser();
    }, []);
    const fetchTotalUser = async () => {
        try {
            const totalUsersResponse = await axios.get('http://localhost:4000/admin/all-user');
            setTotalUsers(totalUsersResponse.data.allUser);
            const newUserCountResponse = await axios.get('http://localhost:4000/admin/new-user');
            setNewUserCount(newUserCountResponse.data.usersAddedToday);
            const totalProjectResponse = await axios.get('http://localhost:4000/admin/total-project');
            setProjectCount(totalProjectResponse.data.projects)

        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };

    // const updateUserCount = async () => {
    //     try {
    //         const totalUsersResponse = await axios.get('http://localhost:4000/admin/all-user');
    //         setTotalUsers(totalUsersResponse.data.allUser);
    //         const newUserCountResponse = await axios.get('http://localhost:4000/admin/new-user');
    //         setNewUserCount(newUserCountResponse.data.usersAddedToday);
    //         const totalProjectResponse = await axios.get('http://localhost:4000/admin/total-project');
    //         setProjectCount(totalProjectResponse.data.projects)
    //     } catch (error) {
    //         console.error('Error updating user count:', error);
    //     }
    // };
    return <div>
        <div className="flex flex-col p-6 h-screen w-full">
        <span className="text-white font-bold text-2xl">Dashbord</span>
        <UserDetails totalUsers={totalUsers} newUserCount={newUserCount} totalProject={projectCount}/>
        <UserList updateUserCount={fetchTotalUser}/>
        </div>
    </div>
}