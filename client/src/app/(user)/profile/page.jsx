"use client"
import axios from "axios";
import {
    Settings,
  } from "lucide-react";
  import React, { useEffect, useState } from "react";
  import {Avatar} from "@nextui-org/react";
import ProjectShowingCard from "@/components/projectShowingCard";

  
  export default function Profile() {
    const [profile, setProfile] = useState([]);
    const [projects , setProjects] = useState([]);
    const [Follower, setFollower] = useState([])
    useEffect(()=>{
        fetchProfile(),
        userProject(),
        fetchFollower()
    },[])
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
      const userProject = async ()=>{
        try{
          const userProject = await axios.get("http://localhost:4000/api/user-post",{
            headers:{
              authToken: localStorage.getItem('authToken')
            }
          })
          setProjects(userProject.data.userProject)
        }catch(e){
          console.error("Error fetching user count:", e);
        }
      }
      const fetchFollower = async ()=>{
        try{
          const response = await axios.get("http://localhost:4000/api/get-follower",{
            headers:{
              authToken: localStorage.getItem('authToken')
            }
          })
          console.log(response.data)
          setFollower(response.data)
        }catch(e){
          console.error("Error fetching user count:", e);
        }
      }
      
    return (
      <div className="flex w-full">
      <div className="w-[10%]"></div>
      <div className="bg-[#17151f] w-full h-screen flex">
        
        <div className="flex  justify-center items-center w-full flex-col px-4 ">
          <div className="flex">
            <div className="flex gap-10">
            <Avatar src={`http://localhost:4000${profile.profileUrl}`} className="w-40 h-40 text-large" />

              <div className="flex flex-col gap-3">
                <div className="flex gap-20">
                  <div className="font-bold text-white text-sm">{profile.username}</div>
                  
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="font-light text-white">
                    <span className="text-sm text-white font-normal">{Follower.totalFollower}</span> Follower
                  </div>
                  <div className="font-light text-sm text-white">
                    <span className="text-sm text-white font-normal">{Follower.totalFollowing}</span> Following
                  </div>
                </div>
                <div className="text-white">{profile.name}</div>
                <div className="flex  flex-col gap-1">
                  <div className="font-semibold text-white">Bio</div>
                  <div className="max-w-[350px] text-white text-sm">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Dolorum id
                  </div>
                  <button className="w-fit rounded-lg text-xs  bg-gray-300 px-2 py-1 font-bold hover:bg-slate-600">
                    Edit profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[0.5px] bg-white w-full mt-6 mb-3"></div>
          <span className="font-normal mb-2 hover:font-semibold text-start text-white">Project</span>
          <div className="px-6 w-full flex gap-2 flex-wrap">
            {projects.map((userProjects, index)=>(
            <ProjectShowingCard key={index} project={userProjects} fetchProject={userProject}/>
            ))}
          </div>
        </div>
      </div>
      </div>
    );
  };
  

  