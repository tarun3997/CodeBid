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
  Tooltip
} from "@nextui-org/react";
// import PostDetailModel from "./postDetailScreen";
import CommentForm from "./postCommentComponent";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PostDetailModel from "./postDetailScreen";
import {
  likePostApi,
  handelNotificationApi,
  handelCommentApi,
  handelCommentNotificationApi,
} from "@/api/postApi";
import EditPost from "./ModelComponents/EditProfile";
import DeletePost from "./ModelComponents/DeletePost";

export default function ProjectCard({ project, fetchProject }) {
  const [isProjectLike, setProjectLike] = useState(project.isLikes);
  const [showIcon, setShowIcon] = useState(false);
  const [isPostSave, setPostSave] = useState(false);
  const [comment, setComment] = useState("");
  const [Follow, setFollow] = useState(project.isFollowing);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modelName, setModelName] = useState("");
  const params = useSearchParams();
  const postId = params.get("p");
  const router = useRouter();
  const likePost = async () => {
    try {
      const projectId = project.projectId;
      await likePostApi(projectId);
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
  const handelNotification = async () => {
    try {
      const id = project.id;
      const postid = project.projectId;
      await handelNotificationApi(id, postid);
    } catch (e) {
      console.error("Error creating like:", e);
    }
  };
  const handelComment = async (e) => {
    e.preventDefault();
    try {
      const postId = project.projectId;
      await handelCommentApi(postId, comment);
      setComment("");
      fetchProject();
      setTimeout(() => {
        handelCommentNotification();
      }, 1000);
    } catch (e) {
      console.error("Error creating like:", e);
    }
  };
  const handelCommentNotification = async () => {
    try {
      const id = project.id;
      const postId = project.projectId;
      await handelCommentNotificationApi(id, postId, comment);
    } catch (e) {
      console.error("Error creating like:", e);
    }
  };
  const deletePost = async () => {
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

  const handelFollowAndFollowing = async () => {
    try {
      const id = project.id;

      await axios.post(
        "http://localhost:4000/api/follow-and-unfollow",
        {
          follower: id,
        },
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
    } catch (e) {
      console.error("Error creating like:", e);
    }
  };
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

  const followClick = () => {
    setFollow(!Follow);
    handelFollowAndFollowing();
  };
  const handleOpen = (post) => {
    router.push(`/?p=${post.projectId}`);
    onOpen();
    setModelName("post");
    // fetchPostData()
  };
  const handleClose = () => {
    router.replace("/");
    onClose();
  };
  const handleChangeComment = (value) => {
    setComment(value);
  };
  const handleDeleteModel = () => {
    onOpen();
    setModelName("delete");
  };
  const handleEditModel = () => {
    onOpen();
    setModelName("Edit");
  };

  return (
    <div className="w-[35%]  flex flex-col shadow-md rounded-lg mb-7 pb-3">
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
              {project.ownPost ? (
                <div></div>
              ) : (
                <div onClick={followClick}>
                  {Follow ? (
                    <span className="text-[#544040] text-sm font-bold cursor-pointer">
                      Following
                    </span>
                  ) : (
                    <span className="text-blue-600 text-sm font-bold cursor-pointer">
                      Follow
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-1">
              <span className="text-xs ">
                <Link href={`/profile/${project.username}`}>
                  @{project.username}
                </Link>
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
          <DropdownMenu aria-label="Dynamic Actions">
            <DropdownItem color="default">Report</DropdownItem>
            <DropdownItem color="default">Copy Link</DropdownItem>
            {project.ownPost && (
              <DropdownItem onClick={handleEditModel} color="default">
                Edit Post
              </DropdownItem>
            )}
            {project.ownPost && (
              <DropdownItem onClick={handleDeleteModel} color="danger">
                Delete Post
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
        {modelName === "Edit" && (
          <EditPost
            isOpen={isOpen}
            onClose={onClose}
            projectId={project.projectId}
            fetchProject={fetchProject}
          />
        )}
        {modelName === "delete" && (
          <DeletePost isOpen={isOpen} onClose={onClose} action={deletePost} />
        )}
      </div>

      <hr />
      <div
        className="w-full min-h-[470px] flex justify-center items-center"
        onDoubleClick={likePost}
        style={{
          backgroundImage: `url(${encodeURI(
            `http://localhost:4000/${project.PostImage.imageUrl}`
          )})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
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
          <AiOutlineMessage
            size={23}
            className="cursor-pointer"
            onClick={() => handleOpen(project)}
          />

          <Tooltip
            content="I am a tooltip"
            delay={0}
            closeDelay={0}
            motionProps={{
              variants: {
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                },
                enter: {
                  opacity: 1,
                  transition: {
                    duration: 0.15,
                    ease: "easeOut",
                  },
                },
              },
            }}
          >
            <div>
              <AiOutlineStar size={23} className="cursor-pointer" />
            </div>
          </Tooltip>
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
        <span
          className=" text-sm text-[#cccccc] cursor-pointer"
          onClick={() => handleOpen(project)}
        >
          View {project.totalComment === 0 ? "" : project.totalComment} all
          comments
        </span>

        {modelName === "post" && (
          <PostDetailModel
            isOpen={isOpen}
            postId={postId}
            onClose={handleClose}
            handelCommentNotification={handelCommentNotification}
            likePost={likePost}
          />
        )}
        <CommentForm
          comment={comment}
          handelComment={handelComment}
          onChangeComment={handleChangeComment}
        />
      </div>
    </div>
  );
}
