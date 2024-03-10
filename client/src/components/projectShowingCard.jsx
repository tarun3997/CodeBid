import { FaHeart, FaEye, FaSave, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import React, { useState } from 'react';
import axios from "axios";



export default function ProjectShowingCard({project}) {
    const [isHovered, setIsHovered] = useState(false);
    const likePost= async()=>{
      try{
        const projectId = project.projectId;
        
        await axios.post("http://localhost:4000/api/like",{
          projectId
        },{
          headers: {
            authToken: localStorage.getItem('authToken')
        }
        })
      }catch(e){
        console.error("Error creating like:", e);
      }
    }
    return <div className="w-[23%]">

    <div className="w-full h-60 flex justify-between items-end  bg-slate-300 rounded-xl cursor-pointer"
style={{
  backgroundImage: `url(${encodeURI(`http://localhost:4000/${project.PostImage.imageUrl}`)})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  position: 'relative', // Necessary for absolute positioning of content
}}
onMouseEnter={() => setIsHovered(true)}
onMouseLeave={() => setIsHovered(false)}
>
<div className="flex justify-between w-full p-2" style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}>
  <span className="text-white truncate w-3/5">{project.title}</span>
  <div className="flex">
    <div className="w-8 h-8 mr-2 bg-slate-50 rounded-full flex items-center justify-center" >
      <FaRegBookmark className="h-4 w-4 text-blue-500"/>
    </div>
    <div onClick={likePost} className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center">
      <FaRegHeart className="h-4 w-4 text-blue-500 "/>
    </div>
  </div>
</div>
</div>
    <div className="flex mt-2 items-center justify-between">
      <div className="flex items-center">
        {/* <Image alt="profile" src={`http://localhost:4000${project.profileUrl}`}
        width={7}
        height={7}
        
        quality={100}
        className="w-7 h-7 rounded-full"/> */}
        <div
            className="w-8 h-8 rounded-full "
            style={{
              backgroundImage: `url(http://localhost:4000${project.profileUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
      <span className="ml-2 text-white text-sm">{project.name}</span>
      <div className="bg-gray-300 pl-2 pr-2 ml-2 rounded-md text-white font-bold text-sm">{project.isPaid}</div>   
      </div>     
      <div className="flex items-center text-white text-xs">
      <FaHeart className="h-4 w-4 text-red-500 mr-1"/>
        <span>112</span>
        <FaEye className="h-4 w-4 ml-2 text-blue-500 mr-1"/>
        <span>{project.views}</span>
        </div>  
    </div>
    </div>
}