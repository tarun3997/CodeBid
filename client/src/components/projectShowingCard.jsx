import { FaHeart, FaEye, FaSave, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import bg from "../../public/bg1.jpg";
import React, { useState } from 'react';
import Image from "next/image";


export default function ProjectShowingCard({project, image}) {
    const [isHovered, setIsHovered] = useState(false);

    return <div className="w-[23%]">

    <div className="w-full h-60 flex justify-between items-end  bg-slate-300 rounded-xl cursor-pointer"
style={{
  backgroundImage: `url(${bg.src})`,
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
    <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center" >
      <FaRegHeart className="h-4 w-4 text-blue-500 "/>
    </div>
  </div>
</div>
</div>
    <div className="flex mt-2 items-center justify-between">
      <div className="flex items-center">
        <Image alt="profile" src={image}
        width={7}
        height={7}
        className="w-7 h-7 rounded-full"/>
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