import { BiBookmark, BiDotsHorizontalRounded } from "react-icons/bi";
import {
  Avatar,
  Modal,
  ModalBody,
  ModalContent,

} from "@nextui-org/react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineStar,
} from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

import CommentForm from "./postCommentComponent";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function PostDetailModel({ isOpen, onClose, postId,handelCommentNotification,likePost }) {
  const [isPostSave, setPostSave] = useState(false);
  const [comment, setComment] = useState("");
  const [PostDeatails, setPostDeatail] = useState([])
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isOpen) {
      fetchPostData();
    }
  }, [ postId]);

  const fetchPostData = async()=>{
    try{
      const response = await axios.get(`http://localhost:4000/api/post-detail/${postId}`,{
        headers:{
          authToken: localStorage.getItem('authToken')
        },
      });
      setPostDeatail(response.data)
    }catch(e){
      console.error("Error fetching user count:", e);
    }finally{
      setLoading(false)
    }
  }
  const handelComment = async (e) => {
    e.preventDefault();   
    try {
      await axios.post(
        "http://localhost:4000/api/comment",
        {
          projectId: PostDeatails.projectId,
          content: comment,
        },
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
        );
        setComment("");
        fetchPostData();
        setTimeout(()=>{
          handelCommentNotification()
        },1000)
    } catch (e) {
      console.error("Error creating like:", e);
    }
  };
  const handleChangeComment = (value) => {
    setComment(value);
  };
  const handleLike = () => {
    likePost()
    fetchPostData()
  };
  
  const profile = PostDeatails.profileUrl;
    const handelSaveClick = () => {
    setPostSave(!isPostSave);
  };
  const backdrop = "blur";

  return (
    <Modal
      backdrop={backdrop}
      className="bg-transparent"
      isOpen={isOpen}
      onClose={onClose}
      size="full"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              {loading ? (<div className="m-auto">
              <Spinner label="Loading..." /></div>) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-full h-full justify-center absolute items-center z-0 " onClick={onClose}></div>
              <div className="flex w-[90%] h-[90%] bg-white absolute  z-10 justify-center items-center ">
                <div className="w-2/4 h-[100%]  border-r-2"
                style={{
                  backgroundImage: `url(${encodeURI(
                    `http://localhost:4000/${PostDeatails.PostImage.imageUrl}`
                  )})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                >

                </div>
                <div className="w-2/4 h-full ">
                  <div className="flex justify-between items-center m-4">
                    <div className="flex items-center justify-center gap-3">
                      <Avatar
                        isBordered
                        src={`http://localhost:4000${profile}`}
                      />
                      <span>{PostDeatails.username}</span>
                    </div>
                    <BiDotsHorizontalRounded size={26} />
                  </div>
                  <div className="border-y-2 h-2/3 flex flex-col overflow-auto">
                    {PostDeatails.comments.map((data, index)=>(
                    <Comment key={index} comments={data.comment} commentsProfileUrl={data.commentsProfileUrl} commentsUsername={data.commentsUsername}/>
                    ))}
                  </div>
                  <div className="flex justify-between m-3">
                    <div className="flex gap-4">
                      <div className="cursor-pointer" onClick={handleLike}>
                        {PostDeatails.isLikes ? (
                          <AiFillHeart color="red" size={26} />
                        ) : (
                          <AiOutlineHeart size={26} />
                        )}
                      </div>
                      <AiOutlineMessage size={26} className="cursor-pointer" />
                      <AiOutlineStar size={26} className="cursor-pointer" />
                    </div>
                    <div onClick={handelSaveClick}>
                      {isPostSave ? (
                        <BsFillBookmarkFill
                          size={26}
                          className="cursor-pointer"
                        />
                      ) : (
                        <BiBookmark size={26} className="cursor-pointer" />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col mx-4">
                    <span className="font-bold">{PostDeatails.likes} likes</span>
                    <span className="font-light text-xs">1 hour ago</span>
                  </div>
                  <div className="border-t-1 p-2">
                    <CommentForm comment={comment} handelComment={handelComment} onChangeComment={handleChangeComment}/>
                  </div>
                </div>
              </div>
              </div>)}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

function Comment ({commentsProfileUrl,commentsUsername,comments}){
  return(<div className="flex items-start gap-3 my-2">
  <div className="ml-4">
    <Avatar
      src={`http://localhost:4000${commentsProfileUrl}`}
      size="md"
    />
  </div>
  <span>
    <span className="font-bold">{commentsUsername}</span> {comments}
  </span>
</div>)
}
