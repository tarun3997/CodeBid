import { BiBookmark, BiDotsHorizontalRounded } from "react-icons/bi";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineStar,
} from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useState } from "react";
import CommentForm from "./postCommentComponent";

export default function PostDetailModel({ isOpen, onClose }) {
  const [isProjectLike, setProjectLike] = useState(false);
  const [isPostSave, setPostSave] = useState(false);

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
              <div
                className="flex w-full h-full justify-center items-center bg-transparent"
                onClick={onClose}
              >
                <div className="w-2/5 h-[90%] bg-blue-500"></div>
                <div className="w-2/5 h-[90%] bg-white">
                  <div className="flex justify-between items-center m-4">
                    <div className="flex items-center justify-center gap-3">
                      <Avatar
                        isBordered
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      />
                      <span>Username</span>
                    </div>
                    <BiDotsHorizontalRounded size={26} />
                  </div>
                  <div className="border-y-2 h-2/3">
                    <div className="flex items-start gap-3 my-2">
                      <div className="ml-4">
                        <Avatar
                          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                          size="md"
                        />
                      </div>
                      <span>
                        <span className="font-bold">Username</span> Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. Id quis
                        dolores, a atque adipisci inventore maiores, hic
                        voluptates, obcaecati minima molestias!
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between m-3">
                    <div className="flex gap-4">
                      <div className="cursor-pointer">
                        {isProjectLike ? (
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
                    <span className="font-bold">78,609 likes</span>
                    <span className="font-light text-xs">1 hour ago</span>
                  </div>
                  <div className="border-t-1 p-2">
                    <CommentForm />
                  </div>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
