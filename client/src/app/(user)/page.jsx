"use client";


import { AiFillMessage } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { FaSearch, FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "@/components/projectCard";
import ProfileDropdown from "@/components/profileDropDownComponet";

export default function Home() {
  const [profile, setProfile] = useState([]);
  const [project, setProject]= useState([]);
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
    }
  }

    
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-around items-center w-full mt-4">
        <div></div>
        <div className="relative flex items-center w-[30%] h-12">
          <input
            className="h-10 w-full rounded-lg outline-none text-white text-sm p-4 pr-10 bg-[#393b70]"
            type="text"
            placeholder="Search Here..."
          />
          <FaSearch className="absolute  right-5 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <TopIconDiv icon={<FaBell className="fill-white" />} />
          <TopIconDiv icon={<AiFillMessage className="fill-white" />} />
          {/* <div
            className="w-10 h-10 rounded-full  cursor-pointer"
            style={{
              backgroundImage: `url(${profileImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div> */}
          <ProfileDropdown profileImage={profile.profileUrl} email={profile.email}/>
        </div>
      </div>
      <div className="p-6 w-full items-center  flex flex-col">
        <span className=" text-white text-start font-Archivo ">FEATURED POSTS</span>
        {project.length === 0 ? (
        <div className="text-white m-auto">No project available</div>) :
        (<div className="flex w-full flex-col items-center mt-4 justify-stretch gap-5">
        {/* {project.map((projects, index)=>(
        <ProjectShowingCard key={index} project={projects} fetchProject={fetchProjects}/>
        ))} */}
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
