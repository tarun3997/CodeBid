import { BiBookmark } from "react-icons/bi"; 
import { AiOutlineMessage } from "react-icons/ai"; 
import { AiFillHeart } from "react-icons/ai"; 
import { AiOutlineHeart } from "react-icons/ai"; 
import { BsFillBookmarkFill } from "react-icons/bs"; 
import { BsThreeDotsVertical } from "react-icons/bs"; 
import { AiOutlineStar } from "react-icons/ai";
import React, { useState } from "react";
import axios from "axios";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

import {Textarea} from "@nextui-org/react";


export default function ProjectCard({ project, fetchProject }) {
  const [isProjectLike, setProjectLike] = useState(project.isLikes);
  const [showIcon, setShowIcon] = useState(false);
  const [isPostSave, setPostSave] = useState(false);
  const [comment, setComment]= useState('');

  const likePost = async () => {
    try {
      const projectId = project.projectId;

      await axios.post(
        "http://localhost:4000/api/like",
        {
          projectId,
        },
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
      setProjectLike(!isProjectLike);
      fetchProject();
      setShowIcon(true);
      setTimeout(() => {
        setShowIcon(false);
      }, 1000);
      } catch (e) {
      console.error("Error creating like:", e);
    }
  };
  const handelComment = async(e)=>{
    e.preventDefault();
    try{
      await axios.post(
        'http://localhost:4000/api/comment',
        {
          projectId: project.projectId,
          content: comment
        },
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          }
        }
      );
      setComment('');
      fetchProject()
    }catch(e){
      console.error("Error creating like:", e);
    }
  }
  const handelDeletePost = async(e)=>{
    try{
    const projectId = project.projectId;
    await axios.post("http://localhost:4000/api/delete",{
      projectId,
        },
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
    })
    fetchProject();
  }catch(e){
    console.error("Error deleting post:", e);
  }
  }

  const items = [
    {
      key: "report",
      label: "Report",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit Post",
    },
    {
      key: "delete",
      label: "Delete Post",
    }
  ];
  const handelSaveClick=()=>{
    setPostSave(!isPostSave)
  }
  
  return (
    <div className="w-[40%]  bg-white flex flex-col rounded-lg mb-7 pb-3">
      <div className="flex justify-between items-center m-3">
        <div className="flex items-center gap-2">
          <div
            className="w-11 h-11 rounded-full "
            style={{
              backgroundImage: `url(http://localhost:4000${project.profileUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="flex flex-col">
          <span className="font-bold">{project.name}</span>
          <div className="flex gap-1">
          <span className="text-xs text-[#677681]">@{project.username}</span>
          <span className="text-xs text-[#677681]">{project.createdAt}</span>
          </div>
        </div>
        </div>
        <div className="cursor-pointer" >
        
        </div>
        <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="light" 
        >
          <BsThreeDotsVertical size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "delete" ? "danger" : "default"}
            className={item.key === "delete" ? "text-danger" : ""}
            onClick={item.key === "delete" ? handelDeletePost : undefined}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
        
      </div>
      
      <hr />
      <div
        className="w-full min-h-[470px] flex justify-center items-center"
        onDoubleClick={likePost}
        style={{
          backgroundImage: `url(${encodeURI(
            `http://localhost:4000/${project.PostImage.imageUrl}`
          )})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {showIcon && <AiFillHeart color="red" size={55} />}
      </div>
      <hr />
      <div className="flex justify-between m-3">
      <div className="flex gap-4">
        <div onClick={likePost} className="cursor-pointer">
      {isProjectLike ? (<AiFillHeart color="red" size={23} />) : (<AiOutlineHeart size={23} />)}
      </div>
      <AiOutlineMessage size={23} className="cursor-pointer"/>
      <AiOutlineStar size={23} className="cursor-pointer"/>
      </div>
      <div onClick={handelSaveClick}>
      {isPostSave ? <BsFillBookmarkFill size={23} className="cursor-pointer"/>: <BiBookmark size={23} className="cursor-pointer"/>}
      </div>      
      </div>
      <div className="flex flex-col ml-3 mr-3 gap-1">
      <span className="text-sm font-bold">{project.likes} likes</span>
      <span className="">{project.title}</span>
      <span className=" text-sm text-[#cccccc] cursor-pointer">View {project.totalComment === 0 ? '' : project.totalComment} all comments</span>
      {/* <input type="text" placeholder="Add a comment..." className="text-sm "/> */}
      {/* <Textarea
          
          variant="underlined"
          labelPlacement="outside"
          placeholder="Add a comment..."
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"

        /> */}
        <form onSubmit={handelComment}>
        <div className="group flex flex-col w-full col-span-12 md:col-span-6 mb-6 md:mb-0" data-slot="base" data-filled="true" data-filled-within="true"><div data-slot="input-wrapper" className="w-full inline-flex tap-highlight-transparent flex-row items-center gap-3 !px-1 !pb-0 !gap-0 relative box-border border-b-medium shadow-[0_1px_0px_0_rgba(0,0,0,0.05)] border-default-200 !rounded-none hover:border-default-300 after:content-[''] after:w-0 after:origin-center after:bg-default-foreground after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-[2px] after:h-[2px] group-data-[focus=true]:after:w-full h-unit-8 min-h-unit-8 px-2 rounded-small !h-auto transition-background motion-reduce:transition-none !duration-150 after:transition-width motion-reduce:after:transition-none py-2" data-has-multiple-rows="true" style={{cursor: "text"}}><div data-slot="inner-wrapper" className="inline-flex w-full h-full box-border items-start group-data-[has-label=true]:items-start pb-1">
          <input 
          value={comment} 
          type="text"
          autoComplete="off"
          
          onChange={(e)=> setComment(e.target.value)}
          data-slot="input" className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small resize-none data-[hide-scroll=true]:scrollbar-hide group-data-[has-value=true]:text-foreground h-full transition-height !duration-100 motion-reduce:transition-none" aria-label="Add a comment..." placeholder="Add a comment..." id="react-aria1922290494-:r0:" data-hide-scroll="true" style={{height: '25px'}}></input>          
          </div></div></div>
          </form>
      </div>      
    </div>
  );
}

