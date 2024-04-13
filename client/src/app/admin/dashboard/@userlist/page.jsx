"use client"

import UserListTable from "@/components/adminUserListTable";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserList({ updateUserCount }) {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        fetchUserList();
    }, []);

    const fetchUserList = async () => {
        try {
            const response = await axios.get('http://localhost:4000/admin/user-list');
            setUserList(response.data.userList);
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };
    const deleteUser= async(email)=>{
        try{
            const response = await axios.post('http://localhost:4000/admin/delete-user',{
                email: email
            });
            if (response.data.message === 'User Delete Successfully') {
                fetchUserList();
                updateUserCount();

            } else {
                console.error('Error deleting user:', response.data.message);
            }
        }catch(e){
            console.error('Error deleting user:', e);
        }
    }
    return (
        <div className="w-[60%] h-[60%] rounded-lg p-4 border-2 shadow-lg">
        <UserListTable />
        </div>
    );
}
