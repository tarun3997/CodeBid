import { BiBookmark } from "react-icons/bi";
import { AiOutlineMessage } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDisclosure } from "@nextui-org/react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import PostDetailModel from "./postDetailScreen";
import CommentForm from "./postCommentComponent";


export default function ProjectCard({ project, fetchProject }) {
  const [isProjectLike, setProjectLike] = useState(project.isLikes);
  const [showIcon, setShowIcon] = useState(false);
  const [isPostSave, setPostSave] = useState(false);
  const [comment, setComment] = useState("");
  const [Follow, setFollow] = useState(project.isFollowing)
  const [OwnPost, setOwnPost] = useState(project.ownPost)
  const {isOpen, onOpen, onClose} = useDisclosure();

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
        handelNotification();
      }, 1000);
    } catch (e) {
      console.error("Error creating like:", e);
    }
  };
  const handelNotification = async ()=>{
    try{
      await axios.post('http://localhost:4000/notification/like',{
        receiver: project.id,
        postId: project.projectId,
      },
      {
        headers:{
          authToken: localStorage.getItem("authToken"),
        }
      }
      );
    }catch(e){
      console.error("Error creating like:", e);
    }
  }
  const handelComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/comment",
        {
          projectId: project.projectId,
          content: comment,
        },
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
        );
        setComment("");
        fetchProject();
        setTimeout(()=>{
          handelCommentNotification()
        },1000)
    } catch (e) {
      console.error("Error creating like:", e);
    }
  };
  const handelCommentNotification = async()=>{
    try{
      await axios.post('http://localhost:4000/notification/comment',{
        receiver: project.id,
        postId: project.projectId,
        comment: comment
      },{
        headers: {
          authToken: localStorage.getItem("authToken"),
        },
      })
    }catch(e){
      console.error("Error creating like:", e);
    }
  }
  const handelDeletePost = async (e) => {
    try {
      const projectId = project.projectId;
      await axios.post(
        "http://localhost:4000/api/delete",
        {
          projectId,
        },
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
      fetchProject();
    } catch (e) {
      console.error("Error deleting post:", e);
    }
  };

  const handelFollowAndFollowing = async ()=>{
    try{
      const id = project.id;

      await axios.post('http://localhost:4000/api/follow-and-unfollow',{
        follower: id
      },{
        headers:{
          authToken: localStorage.getItem("authToken"),
        }
      })
    }catch(e){
      console.error("Error creating like:", e);
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
    },
  ];
  const handelSaveClick = () => {
    setPostSave(!isPostSave);
  };

  const followClick = ()=>{
    setFollow(!Follow)
    handelFollowAndFollowing()
  }
  const handleOpen = () => {
    onOpen();
  }
  const handleChangeComment = (value) => {
    setComment(value);
  };

  return (
    <div className="w-[35%]  bg-white flex flex-col rounded-lg mb-7 pb-3">
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
            <div className="flex gap-2 items-center">
            <span className="font-bold">{project.name}</span>
            {project.ownPost ? <div></div> :
            <div onClick={followClick}>
            { Follow ? 
            <span className="text-[#544040] text-sm font-bold cursor-pointer">Following</span> : <span className="text-blue-600 text-sm font-bold cursor-pointer">Follow</span>
            }
            </div>
}
            </div>
            <div className="flex gap-1">
              <span className="text-xs text-[#677681]">
                @{project.username}
              </span>
              <span className="text-xs text-[#677681]">
                {project.createdAt}
              </span>
            </div>
          </div>
        </div>
        <div className="cursor-pointer"></div>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light">
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
            {isProjectLike ? (
              <AiFillHeart color="red" size={23} />
            ) : (
              <AiOutlineHeart size={23} />
            )}
          </div>
          <AiOutlineMessage size={23} className="cursor-pointer" />
          <AiOutlineStar size={23} className="cursor-pointer" />
        </div>
        <div onClick={handelSaveClick}>
          {isPostSave ? (
            <BsFillBookmarkFill size={23} className="cursor-pointer" />
          ) : (
            <BiBookmark size={23} className="cursor-pointer" />
          )}
        </div>
      </div>
      <div className="flex flex-col ml-3 mr-3 gap-1">
        <span className="text-sm font-bold">{project.likes} likes</span>
        <span className="">{project.title}</span>
        <span className=" text-sm text-[#cccccc] cursor-pointer" onClick={handleOpen}>
          View {project.totalComment === 0 ? "" : project.totalComment} all
          comments
        </span>
        <PostDetailModel isOpen={isOpen} onClose={onClose}/>
        
        <CommentForm comment={comment} handelComment={handelComment} onChangeComment={handleChangeComment}/>
      </div>
    </div>
  );
}
