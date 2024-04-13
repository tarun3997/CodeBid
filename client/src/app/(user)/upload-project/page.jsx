"use client";
import { ImCancelCircle } from "react-icons/im";
import { MdCancel } from "react-icons/md";
import { Button, Image, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadProject({}) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);

  // const [imageFile, setImageFile] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setSelectedImage(files);
  };
  const removeImage = (updatedImages) => {
    setSelectedImage(updatedImages);
  };
  const cancelFunc = () => {
    setSelectedImage([]);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("postLocation", location);
      selectedImage.forEach((image) => {
        formData.append("imageUrl", image);
      });
      const response = await axios.post(
        "http://localhost:4000/api/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
      if (response.status === 201) {
        router.push("/");
      } else {
        console.error("Upload failed");
      }
    } catch (e) {
      console.error("Error occurred:", e);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="h-[70%] ">
        {selectedImage.length === 0 ? (
          <UploadImageComponent handleImageChange={handleImageChange} />
        ) : (
          <UploadComponent
            cancelFunc={cancelFunc}
            imageSrc={selectedImage}
            removeImage={removeImage}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            location={location}
            setLocation={setLocation}
            onSubmit={submit}
          />
        )}
      </div>
    </div>
  );
}

function UploadImageComponent({ handleImageChange }) {
  return (
    <div className="relative flex rounded-[30px]  h-full items-center justify-center border-1 shadow-md">
      <div className=" px-20 w-full flex items-center justify-center">
        <form encType="multipart/form-data">
          <div className="flex flex-col gap-4  items-center text-center border-dashed border-3 rounded-2xl py-10 px-4">
            <div>
              <Upload className="h-16 w-16  " />
            </div>
            <span className="">Drag and drop files to upload</span>
            <span className="">Or</span>

            <input
              type="file"
              id="avatarInput"
              className="hidden"
              multiple
              onChange={handleImageChange}
              name="imageUrl"
              required
            />
            <label
              htmlFor="avatarInput"
              className="bg-sky-500 text-white rounded-l-full rounded-r-full py-1 px-5"
            >
              Choose File
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

function UploadComponent({
  cancelFunc,
  imageSrc,
  removeImage,
  title,
  setTitle,
  description,
  setDescription,
  location,
  setLocation,
  onSubmit,
}) {
  const handelRemoveImage = (indexToRemove) => {
    const updatedImages = imageSrc.filter(
      (_, index) => index !== indexToRemove
    );
    removeImage(updatedImages);
  };

  return (
    <div className=" border-1 shadow-md h-full rounded-2xl flex flex-col gap-10  items-center p-4  mt-2">
      <button
        onClick={cancelFunc}
        className="w-full flex justify-end items-center"
      >
        <ImCancelCircle />
      </button>
      <div className=" max-w-screen-sm h-4/5 justify-around relative flex rounded-r-2xl rounded-l-2xl ">
        <div className="w-2/4 h-[90%] grid border-2 rounded-xl grid-cols-2 p-1 gap-2 items-baseline justify-center">
          {imageSrc.map((image, index) => (
            <div
              className="relative w-full h-full border-2 shadow-md bg-white rounded-xl"
              key={index}
            >
              <div
                className="absolute z-10 right-0 -top-1"
                onClick={() => handelRemoveImage(index)}
              >
                <MdCancel className=" shadow-lg" />
              </div>

              <Image
                isZoomed
                className="w-full h-full relative z-0"
                alt="NextUI Fruit Image with Zoom"
                src={URL.createObjectURL(image)}
              />
            </div>
          ))}
        </div>
        <div className="px-8 py-2 border-2 rounded-xl flex flex-col justify-center items-center gap-5">
          <CustomInput
          
            placeholder={"Enter title"}
          
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
          
           
            onChange={(e) => setDescription(e.target.value)}
            variant="underlined"
            labelPlacement="outside"
            placeholder="Enter your description"
            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
            disableAutosize
            classNames={{
              base: "max-w-xs",
              input: "resize-y min-h-[40px]",
            }}
          />
          <CustomInput
          
            placeholder={"Enter location"}
            
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button color="primary" variant="shadow" onClick={onSubmit}>
            Upload
          </Button>
          
        </div>
      </div>
    </div>
  );
}

function CustomInput({ placeholder, value, onChange }) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Input required type="text" variant="underlined" label={placeholder} onChange={onChange} />
    </div>
  );
}

