"use client";
import { AiFillMessage } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { FaSearch, FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "@/components/projectCard";
import ProfileDropdown from "@/components/profileDropDownComponet";
import { CircularProgress, Spinner } from "@nextui-org/react";
import Notification from "@/components/notificationList";

export default function Home() {
  const [profile, setProfile] = useState([]);
  const [project, setProject]= useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState([])

  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/welcome');
      }
    fetchProfile();
    fetchProjects();
  }, []);

  const fetchProfile = async () => {
    try {
      const profile = await axios.get(
        "http://localhost:4000/api/user-profile",
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );

      setProfile(profile.data.userProfile);
    } catch (e) {
      console.error("Error fetching user count:", e);
    }
  };
  // console.log(profile)
  
  const fetchProjects = async ()=>{
    try {
      const profile = await axios.get("http://localhost:4000/api/get-projects",{
          headers: {
            authToken: localStorage.getItem('authToken')
        }
      });
      
      setProject(profile.data.getProject)
      
      
    } catch (e) {
      console.error("Error fetching user count:", e);
    } finally{
      setLoading(false)
    }
  }

  const notificationData = async()=>{
    try{
      const response = await axios.get('http://localhost:4000/notification/get-like',{
        headers:{
          authToken: localStorage.getItem('authToken')
        }
      });
      setNotification(response.data.filterNotification)
    }catch(e){
      console.error("Error fetching user count:", e);
    }
  }


  const handelMessageClick =()=>{
    router.push('/messages')
  }
  

    
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-end items-center mt-4 pr-10">
        <div className="flex gap-4">
          <Notification onClick={notificationData} notification={notification}/>
          <div onClick={handelMessageClick}>
          <TopIconDiv icon={<AiFillMessage className="fill-white" />}  />
          </div>
          <ProfileDropdown profileImage={profile.profileUrl} email={profile.email}/>
        </div>
      </div>
      
      <div className="pt-6 w-full min-h-screen items-center  flex flex-col">
        <span className="  text-start font-Archivo ">FEATURED POSTS</span>
        {loading ? (
          <div className=" m-auto">
            <Spinner label="Loading..." />
          </div>
        ) : project.length === 0 ? (
        <div className="m-auto">No project available</div>) :
        (<div className="flex w-full flex-col items-center mt-4 justify-stretch gap-5">
        {project.map((projects, index)=>(
          <ProjectCard key={index} project={projects} fetchProject={fetchProjects}/>
        ))}
        </div>)
        }
        
      </div>
    </div>
  );
}

function TopIconDiv({ icon }) {
  return (
    <div className="bg-[#393b70] w-10 h-10 flex justify-center items-center rounded-lg cursor-pointer">
      {icon}
    </div>
  );
}
