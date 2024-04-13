import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";

export default function EditPost({ isOpen, onClose, projectId , fetchProject}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const updatePost = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/update",
        {
          projectId: projectId,
          title: title,
          description: description,
          postLocation: postLocation,
        },
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
      fetchProject();
      onClose()
    } catch (e) {
      console.error("Error creating like:", e);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} placement="top-center" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit post
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Title"
                  placeholder="Enter new title"
                  variant="bordered"
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Textarea
                  onChange={(e) => setDescription(e.target.value)}
                  variant="bordered"
                  placeholder="Enter new description"
                  label="Description"
                  className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                  disableAutosize
                  classNames={{
                    base: "w-full",
                    input: "resize-y min-h-[40px]",
                  }}
                />
                <Input
                  onChange={(e) => setPostLocation(e.target.value)}
                  label="Location"
                  placeholder="Enter new location"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={updatePost} >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
