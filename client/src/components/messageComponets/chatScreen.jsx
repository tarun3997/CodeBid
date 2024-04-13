import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import io from "socket.io-client";
import MessageUi from "./receiverMessage";

const URL = "http://localhost:4000";
const authToken = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;

const socket = io(URL, {
  auth: {
    authToken: authToken,
  },
});

export default function ChatScreen({
  renderMessageTimestamp,
  receiverId,
  name,
  profileImg,
  selectedUser
}) {
  const [input, setInput] = useState("");
  const [userMessage, setUserMessage] = useState([]);
  const scrollRef = useRef();
  
  useEffect(() => {
    socket.emit('join-room',receiverId)

    userChat();
    
  }, [receiverId]);
  useEffect(()=>{
    socket.on('user-message', handleNewMessage);
    return () => {
      socket.off("user-message", handleNewMessage);
    }
  },[])
  useEffect(()=>{
    scrollToBottom();
  },[userMessage]) 
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleNewMessage =(text)=>{
    setUserMessage((prevMessages) => [...prevMessages, { sendBy: false, text: text }]) ;
    
  }
  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      const data = {
        receiverId:selectedUser.id,
        text: input
      }
      socket.emit("user-message", data);
      setUserMessage((prevMessages) => [...prevMessages, { sendBy: true, text: input }]);      
      setInput("");
      scrollToBottom();
    }
  };
    
  const userChat = async () => { 

    try {
      const chat = await axios.get(
        `http://localhost:4000/chat/api/user-chat/${receiverId}`,
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
      setUserMessage(chat.data);
    } catch (e) {
      console.error("Error fetching user count:", e);
    }
  };
  useLayoutEffect(()=>{
    scrollToBottom()
  },[])
  return (
    <div className="w-[60%] h-4/5  rounded-xl p-5">
      <div className="flex gap-4">
        <div
          className="w-11 h-11 rounded-full "
          style={{
            backgroundImage: `url(http://localhost:4000${profileImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <span className="overflow-ellipsis font-bold">
              {name}
            </span>
            <span className="text-xs">14:22</span>
          </div>
          <span className=" text-xs whitespace-nowrap overflow-hidden truncate">
            Active
          </span>
        </div>
      </div>
      <div className="w-full h-[90%] rounded-lg  mt-4 flex flex-col justify-end items-center">
        <div className="w-full h-full overflow-y-auto flex flex-col ">
        <span className="text-xs text-center w-full mb-4 font-semibold  text-[#616060]">{renderMessageTimestamp}</span>
        {userMessage.map((data, index) => (
          <MessageUi key={index} isOwnMessage={data.sendBy} profile={data.senderProfile} text={data.text}/>
        ))}
        </div>
        <div className="w-full">
          <div className="flex items-center px-3 py-2 rounded-lg  ">
            <textarea
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className=" resize-none block mx-4 p-2.5 w-full text-sm  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
            ></textarea>
            <button
              type="button"
              onClick={userChat}
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
              className="inline-flex justify-center p-2 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
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
  );
}
