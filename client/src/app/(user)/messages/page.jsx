"use client";

import ChatScreen from "@/components/messageComponets/chatScreen";
import MessageList from "@/components/messageComponets/messageList";
import { Input } from "@nextui-org/react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import io from "socket.io-client";
const URL = "http://localhost:4000";
const authToken = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;

const socket = io(URL, {
  auth: {
    authToken: authToken,
  },
});

export default function Message() {
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const userId = params.get("user");

  useEffect(() => {
    userLists();
  }, []);

  const userLists = async () => {
    try {
      const users = await axios.get(
        "http://localhost:4000/chat/api/user-list",
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
      setUserList(users.data);
      setFilteredUserList(users.data);
    } catch (e) {
      console.error("Error fetching user count:", e);
    }
  };

  
 

  const handelUserSelection = (user) => {
    setSelectedUser(user);
    router.replace(`/messages/?user=${user.id}`);

  };
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    filterUserList(e.target.value);
  };

  const users = async ()=>{
    try{
      const response =  await axios.get('http://localhost:4000/chat/api/search-user',
      {
        headers: {
          authToken: localStorage.getItem("authToken"),
        },
        params: {
          user: searchInput, 
        },
      })
    setFilteredUserList(response.data || []);
    }catch(e){
      console.error("Error fetching users:", e);
    }
  }
  useEffect(() => {
    if (searchInput) {
      users();
      
    } else {
      setFilteredUserList(userList);
    }
  }, [searchInput]);
  const filterUserList = (searchQuery) => {
    const filteredList = userList.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUserList(filteredList);
  };
  const renderMessageTimestamp = () => {
    if (messages.length === 0) {
      return "Start your chat";
    } else {
      return new Date().toLocaleDateString();
    }
  };
  
const clearSearch=()=>{
  setSearchInput('')
}
  return (

    <div className="flex w-full">
      <div className="w-[8%]"></div>
    <div className=" flex h-screen justify-center items-center gap-6 w-full">
      <div className="w-[30%] h-4/5 rounded-xl p-4 gap-2  flex flex-col overflow-auto">
        <div className="flex justify-between">
          <span className="font-bold">Inbox</span>
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[54%]",
              inputWrapper: "border-1 relative",
              placeholder: "text-gray-400 text-sm",
            }}
            placeholder="Search by username"
            onClear={clearSearch}
            size="sm"
            startContent={<AiOutlineSearch className="text-default-300" />}
            variant="bordered"
            value={searchInput}
            onChange={handleSearchInputChange}
            
          />
        </div>
        {filteredUserList.length === 0 ? (
        <div className="flex justify-center items-center  h-full">No users</div>
      ) : (
        filteredUserList.map((user, index) => (
          <MessageList
            key={index}
            name={user.name}
            image={user.profileUrl}
            onClick={() => handelUserSelection(user)}
            lastMessageTime={user.lastMessageTime}
            lastMessage={user.lastMessage}
          />
        ))
      )}
      </div>
      {userId === null ? (
        <div className="w-[60%] h-4/5  rounded-xl p-5 flex justify-center items-center ">
          No User is Select
        </div>
      ) : (
        <ChatScreen

          renderMessageTimestamp={renderMessageTimestamp()}
          name={selectedUser.name}
          profileImg={selectedUser.profileUrl}
          receiverId={userId}
          selectedUser={selectedUser}
        />
      )}
    </div>
    </div>
  );
}