"use client";

import MessageList from "@/components/messageComponets/messageList";
import ReceivedMessage from "@/components/messageComponets/receiverMessage";
import SenderMessage from "@/components/messageComponets/senderMessage";
import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const URL = "http://localhost:4000";
const socket = io(URL,{
  auth:{
    authToken: localStorage.getItem('authToken')
  }
});

export default function Message() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userList, setUserList]= useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  
  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    userLists();
    return () => {
      socket.off("message");
    };
  }, []);

  const userLists =async ()=>{
    try{
      const users = await axios.get(
        'http://localhost:4000/chat/api/user-list',
        {
          headers:{
            authToken: localStorage.getItem("authToken"),
          }
        }
      )
      // console.log(users.data)
      setUserList(users.data)
    }catch(e){
      console.error("Error fetching user count:", e);
    }
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      const receiverId = selectedUser.id;
      
      socket.emit('user-message', { receiverId, text: input });
      setInput('');
    }
  };
  socket.on('message',(msg)=> sendMessage((prevMessages)=>[...prevMessages, msg]));
 
  const handelUserSelection=(user)=>{
    setSelectedUser(user)
  }
  const renderMessageTimestamp=()=>{
    if (messages.length === 0) {
      return 'Start your chat';
    } else {
      return new Date().toLocaleDateString();
    }
  }
  const renderMessage = () => {
    console.log("messages:", messages); // Log the entire messages array
  
    return messages.map((message, index) => {
      console.log("message:", message); // Log individual message objects
  
      if (message.senderId === 'ef86ffbf-e1f5-44d2-8688-eacef0bf053c') {
        return <SenderMessage key={index} message={message} />;
      } else {
        return <ReceivedMessage key={index} message={message} />;
      }
    });
  };
  return (
    <div className=" flex h-screen justify-center items-center gap-6 w-full">
      <div className="w-[30%] h-4/5 rounded-xl p-4 gap-2 bg-white/50 flex flex-col overflow-auto">
        <div>
          <span className="font-bold">Inbox</span>
        </div>
        {userList.map((users,index)=>(
          <MessageList key={index} name={users.name} image={users.profileUrl} onClick={()=>handelUserSelection(users)}/>
        ))}
      </div>
      <div className="w-[60%] h-4/5 bg-blue-500 rounded-xl p-5">
        <div className="flex gap-4">
          <div className="w-11 h-11 rounded-full bg-blue-200"></div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <span className="overflow-ellipsis font-bold">Fabio Gramer</span>
              <span className="text-xs">14:22</span>
            </div>
            <span className=" text-xs whitespace-nowrap overflow-hidden truncate">
              Active
            </span>
          </div>
        </div>
        <div className="w-full h-[90%] rounded-lg bg-white mt-4 flex flex-col overflow-auto justify-end items-center">
            <span className="text-xs mb-4 font-semibold text-[#616060]">{renderMessageTimestamp()}</span>
            <div className="w-full flex flex-col ">
            <div className="flex gap-2 mx-4 mb-2 justify-end">
    <div className="w-9 h-9 rounded-full bg-blue-200"></div>
    <div className="bg-[#23262f] p-2 rounded-tr-md rounded-br-md rounded-bl-md max-w-80 text-white">hi</div>
    </div>
            </div>
          <div className="w-full">
            <div className="flex items-center px-3 py-2 rounded-lg  ">
              <textarea
                rows="1"
                value={input}
                onChange={(e)=> setInput(e.target.value)}
                className=" resize-none block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
              ></textarea>
              <button
                type="button"
                className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                  />
                </svg>
                <span class="sr-only">Add emoji</span>
              </button>
              <button
                type="submit" 
                onClick={sendMessage}
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
