import React, { useEffect, useState } from "react";
import { Input, User } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import {handelSearchUser} from "@/api/getUserList"
import axios from "axios";
import Link from 'next/link'


export default function SearchPopover() {
    const [filteredUserList, setFilteredUserList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(()=>{
        if(searchInput){
            users()
        }else{
          setFilteredUserList([]);
          setErrorMessage("");
        }
    },[searchInput])
    const users = async ()=>{
        try{
          const response = await axios.get('http://localhost:4000/chat/api/search-user',
          {
            headers: {
              authToken: localStorage.getItem("authToken"),
            },
            params: {
              user: searchInput, 
            },
          })
        //   console.log(response.data)
        setFilteredUserList(response.data || []);
        setErrorMessage("");
        }catch(e){
          if(e.response && e.response.status === 404){
            setErrorMessage("User not found")
          }else{
            console.error("Error searching for user:", e);
        setErrorMessage("Internal server error");
          }
          setFilteredUserList([]);
        }
      }

      const handelUserInput =(e)=>{
        setSearchInput(e.target.value);
      }
      const handelClearInput=()=>{
        setFilteredUserList([]);
          setErrorMessage("");
          setSearchInput("")
      }
      // console.log(filteredUserList)
  return (
    <div className="w-72  h-[95vh] flex flex-col justify-start items-start">
      <span className="font-bold text-2xl p-2 ">Search</span>
      <Input
      onChange={handelUserInput}
        label="Search"
        isClearable
        onClear={handelClearInput}
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <SearchIcon size={20} className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
      <div className="w-full overflow-auto my-3 h-full custom-scrollbar flex justify-start items-center flex-col">
      {errorMessage && (
          <div className="flex justify-center items-center h-full text-danger-400 font-bold">
            {errorMessage}
          </div>
        )}
        {!searchInput && (
          <div className="flex justify-center items-center h-full">
            Search user with username
          </div>
        )}
        {filteredUserList.map((data, index) => (
        
          <UserList
            key={index}
            name={data.name}
            username={data.username}
            profileUrl={data.profileUrl}
          />
          
        ))}
      </div>
    </div>
  );
}

function UserList({name, username, profileUrl}) {
  return (
    <div className="mt-4 dark::hover:bg-white/10 hover:bg-black/10 w-full rounded-md flex p-1 cursor-pointer">
     <Link href={`/profile/${username}`} className="w-full h-full">
    <User
    className=""
      name={name}
      description=<span className="text-blue-400 text-xs">@{username}</span>
      avatarProps={{
        src: `http://localhost:4000${profileUrl}`,
      }}
    />
    </Link>
    </div>
  );
}
