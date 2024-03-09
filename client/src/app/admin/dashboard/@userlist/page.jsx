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
        // <div className="w-[60%] h-[60%] rounded-lg p-4 bg-[#181b26]">
        //     <span className="font-bold text-lg text-white">User List</span>
        //     <div className="overflow-auto h-[95%] custom-scrollbar">
        //     <table className="text-white border-separate text-left border-spacing-4 w-full">
        //         <thead>
        //             <tr>
        //                 <th>No.</th>
        //                 <th>Name</th>
        //                 <th>Email</th>
        //                 <th>Number</th>
        //                 <th>Create Date</th>
        //                 <th>Delete User</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {userList.map((user, index) => (
                        
        //                 <tr key={user.id} className="border-b border-white">
        //                     <td>{index + 1}</td>
        //                     <td>{user.name}</td>
        //                     <td>{user.email}</td>
        //                     <td>{user.number}</td>
        //                     <td>{user.createdAt}</td>
        //                     <td onClick={()=> deleteUser(user.email)} className="cursor-pointer hover:text-red-500">Delete</td>
        //                 </tr>
        //             ))}
                    
        //         </tbody>
        //     </table>
        //     </div>
        // </div>
        <div className="w-[60%] h-[60%] rounded-lg p-4 bg-[#181b26]">
        <UserListTable />
        </div>
    );
}
