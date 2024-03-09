"use client";


import { AiFillMessage } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { FaSearch, FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "@/components/projectCard";
import ProjectShowingCard from "../../components/projectShowingCard";

export default function Home() {
  const [profileImage, setProfileImage] = useState(null);
  const [projectImage, setProjectImage] = useState(null);
  const [project, setProject]= useState([]);
  useEffect(() => {
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
          responseType: "arraybuffer",
        }
      );
      const imageBase64 = Buffer.from(profile.data, "binary").toString(
        "base64"
      );

      setProfileImage(`data:image/png;base64,${imageBase64}`);
    } catch (e) {
      console.error("Error fetching user count:", e);
    }
  };
  
  const fetchProjects = async ()=>{
    try {
      const profile = await axios.get("http://localhost:4000/api/get-projects",{
       
      });
      
      setProject(profile.data.getProject)
      const imageBase64 = Buffer.from(profile.data.getProject.profileUrl, "binary").toString(
        "base64"
      );
      setProjectImage(`data:image/png;base64,${imageBase64}`)
      
    } catch (e) {
      console.error("Error fetching user count:", e);
    }
  }
  console.log(projectImage)
  
  //   const token = localStorage.getItem('authToken');
  //   console.log(token)
  //     if (!token) {
  //       router.push('/welcome');
  //     }
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
        <div className="flex">
          <TopIconDiv icon={<FaBell className="fill-white" />} />
          <TopIconDiv icon={<AiFillMessage className="fill-white" />} />
          <div
            className="w-10 h-10 rounded-full ml-4 cursor-pointer"
            style={{
              backgroundImage: `url(${profileImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
      <div className="p-6 w-full ">
        <span className="text-white font-Archivo ">FEATURED POSTS</span>
        <div className="flex flex-wrap mt-4 justify-stretch gap-5">
        {project.map((projects, index)=>(
        <ProjectShowingCard key={index} project={projects}image={projectImage} />
        ))}
        </div>
      </div>
    </div>
  );
}

function TopIconDiv({ icon }) {
  return (
    <div className="bg-[#393b70] w-10 h-10 flex justify-center items-center rounded-lg ml-4 cursor-pointer">
      {icon}
    </div>
  );
}
