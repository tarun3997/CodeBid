"use client";
import { IoIosCamera } from "react-icons/io";
import bg from "../../../../../public/login.jpg";
import CustomInput from "@/components/customInput";
import CustomBtn from "@/components/customButton";
import React, { useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
export default function CreateProfile() {
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const username = searchParams.get("username");
  const number = searchParams.get("number");
  const email = searchParams.get("email");
  const password = searchParams.get("password");
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    if (file) {
      setImageFile(file);
      reader.readAsDataURL(file);
    }
  };
  const submit = async(e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profileImage", imageFile);
      formData.append("email", email);
      formData.append("mobile_number", number);
      formData.append("password", password);
      formData.append("name", name);
      formData.append("username", username);
      formData.append("location", location);
      const response = await axios.post("http://localhost:4000/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }, 
      });
        if (response.status === 201) {
            router.push('/login');
        } else {
            console.error('Registration failed');
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
}
  return (
    <div className="bg-gray-900 h-screen w-full flex justify-center items-center">
      <div className="bg-login-bg w-4/5 h-4/5 flex ">
        <div className="w-3/6  flex justify-center items-center">
          <form onSubmit={submit} encType="multipart/form-data">
            <div className="flex flex-col">
              <div className="flex justify-start flex-col mb-10">
                <span className="font-bold text-white text-2xl">
                  Welcome! Let's create your profile
                </span>
                <span className="text-white text-sm mt-2">
                  Let others get to know you better!
                </span>
              </div>
              <span className="text-white text-sm">Add an avatar*</span>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex justify-center items-center w-36 h-36 border-dotted border-white border-[3px] rounded-full">
                  {selectedImage ? (
                    <img src={selectedImage} alt="Selected Avatar" className="w-full h-full rounded-full" />
                  ) : (
                    <IoIosCamera className="fill-white w-8 h-8" />
                  )}
                </div>
                <input
                  type="file"
                  id="avatarInput" 
                  className="hidden"
                  onChange={handleImageChange}
                  name="profileImage"
                  required
                />
                <label htmlFor="avatarInput" className="cursor-pointer block text-sm text-white">
                  Choose File
                </label>
              </div>
              <span className="text-white text-sm mt-4 mb-4">
                Add your location*
              </span>
              <CustomInput
                type={"text"}
                placeholder={"Enter a location"}
                onChanges={(e) => setLocation(e.target.value)}
              />
              <div className="h-5"></div>
              <CustomBtn value={"Create"} />
            </div>
          </form>
        </div>
        <div
          className="w-3/6"
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundSize:  "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
}
