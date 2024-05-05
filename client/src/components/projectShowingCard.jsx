import { BiBookmark, BiDotsVerticalRounded } from "react-icons/bi"; 
import { AiFillHeart } from "react-icons/ai";
import {
  FaHeart,
  FaEye,
  FaSave,
  FaRegBookmark,
  FaRegHeart,
} from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn} from "@nextui-org/react";
import { CopyDocumentIcon } from "./DropdownIcon/CopyDocumentIcon";
import { EditDocumentIcon } from "./DropdownIcon/EditDocumentIcon";
import { DeleteDocumentIcon } from "./DropdownIcon/DeleteDocumentIcon";
import DeletePost from "./ModelComponents/DeletePost";
import { useDisclosure } from "@nextui-org/react";
import EditPost from "./ModelComponents/EditProfile";
import { savedPostApi } from "@/api/postApi";
import { BsFillBookmarkFill } from "react-icons/bs";



export default function ProjectShowingCard({ project, fetchProject }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isProjectLike, setProjectLike] = useState(project.isLikes);
  const [isPostSave, setPostSave] = useState(project.isSaved);
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [modelName, setModelName] = useState("")
  // console.log(project)

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
    } catch (e) {
      console.error("Error creating like:", e);
    }
  };
  const savePost = async () => {
    try {
      const projectId = project.projectId;
      await savedPostApi(projectId);
      setPostSave(!isPostSave);
      fetchProject();
    } catch (e) {
      console.error("Error creating like:", e);
    }
  };
  const deletePost = async ()=>{
    try{
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
    }catch(e){
      console.error("Error creating like:", e);
    }
  }
  
  const handleDeleteModel = () => {
    onOpen();
    setModelName("delete")
  }
  const handleEditModel = () => {
    onOpen();
    setModelName("Edit")
  }

  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  return (
    <div className="w-[23%]">
      <div
        className="w-full h-60 flex justify-between items-end  bg-slate-300 rounded-xl cursor-pointer "
        style={{
          backgroundImage: `url(${encodeURI(
            `http://localhost:4000/${project.PostImage.imageUrl}`
          )})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30   rounded-xl"></div>
        )}
        <div className="flex flex-col w-full justify-between h-full">
        {
          isHovered && 
        <Dropdown>
      <DropdownTrigger>
      <div className="flex items-end w-full shadow-lg justify-end p-1">
          <BiDotsVerticalRounded color="white"  size={24} />
          </div>
          
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownItem
          key="copy"
          description="Copy the file link"
          startContent={<CopyDocumentIcon className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          showDivider
          description="Allows you to edit the file"
          startContent={<EditDocumentIcon className={iconClasses} />}
          onClick={handleEditModel}
          >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the file"
          startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
          onClick={handleDeleteModel}
          >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
        }
    {modelName === "Edit" &&
    <EditPost isOpen={isOpen} onClose={onClose} projectId={project.projectId} fetchProject={fetchProject}/>
    }
    {modelName === "delete" &&
    <DeletePost isOpen={isOpen} onClose={onClose} action={deletePost}/>
    }
          
        <div
          className="relative flex justify-between w-full p-1 shadow-lg bg-white/30 "
          style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.3s" }}
        >

          <span className=" truncate font-bold w-3/5 p-1">{project.title}</span>
          <div className="flex">
            {/* <div className="w-8 h-8 mr-2 bg-slate-50 rounded-full flex items-center justify-center">
              <FaRegBookmark className="h-4 w-4 text-blue-500" />
            </div> */}
            <div onClick={savePost} className="cursor-pointer w-8 h-8 mr-2 bg-slate-50 rounded-full flex items-center justify-center">
          {isPostSave ? (
            <BsFillBookmarkFill size={16}  />
          ) : (
            <BiBookmark size={16} color="blue"/>
          )}
        </div>
            <div
              onClick={likePost}
              className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center"
            >
              {isProjectLike ? (
                <AiFillHeart className="h-4 w-4 text-red-500 " />
              ) : (
                <FaRegHeart className="h-4 w-4 text-blue-500 " />
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="flex mt-2 items-center justify-between">
        <div className="flex items-center">
          <div
            className="w-8 h-8 rounded-full "
            style={{
              backgroundImage: `url(http://localhost:4000${project.profileUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <span className="ml-2  text-sm">{project.name}</span>
          <div className="bg-gray-300 pl-2 pr-2 ml-2 rounded-md font-bold text-sm">
            {project.isPaid}
          </div>
        </div>
        <div className="flex items-center  text-xs">
          <FaHeart className="h-4 w-4 text-red-500 mr-1" />
          <span>{project.likes}</span>
          <FaEye className="h-4 w-4 ml-2 text-blue-500 mr-1" />
          <span>{project.views}</span>
        </div>
      </div>
    </div>
  );
}
