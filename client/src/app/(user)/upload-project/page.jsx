"use client"
import CustomBtn from "@/components/customButton";
import CustomInput from "@/components/customInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadProject() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [paid, setPaid] = useState("Free");
    const [selectedImage, setSelectedImage] = useState([]);
    // const [imageFile, setImageFile] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImage(files);   
    };
    

    const submit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("project_Price", amount);
            formData.append("isPaid", paid);
            selectedImage.forEach((image) => {
                formData.append("imageUrl", image);
            });
            const response = await axios.post('http://localhost:4000/api/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authToken: localStorage.getItem('authToken')
                }
            });
            if (response.status === 201) {
                router.push('/');
            } else {
                console.error('Upload failed');
            }
        } catch (e) {
            console.error('Error occurred:', e);
        }
    }
    return (
        <div className="w-full h-screen bg-[#393b70] p-10">
            <span className="text-white font-bold font-Archivo text-lg">Upload Project</span>
            <div className="w-2/3 h-96  m-auto ">
                <form onSubmit={submit} encType="multipart/form-data" className="flex flex-col">
                    <span>Upload Image</span>
                    <input type="file" multiple name="imageUrl" onChange={handleImageChange} />
                    <span>Add title</span>
                    <CustomInput type={"text"} onChanges={(e) => setTitle(e.target.value)} />    
                    <span>Add description</span>
                    <CustomInput type={"textarea"} onChanges={(e) => setDescription(e.target.value)} />
                    <span>Want to sell?</span>
                    <div>
                        <input type="radio" name="isPaid" value="Free" onChange={(e) => setPaid(e.target.value)} />
                        <span>Free</span>
                        <input type="radio" name="isPaid" value="Paid"  onChange={(e) => setPaid(e.target.value)} />
                        <span>Paid</span>   
                    </div>
                    <span>Project amount</span>
                    <CustomInput type={"text"} onChanges={(e) => setAmount(e.target.value)} />
                    <CustomBtn value={"Upload"} />
                </form>
            </div>
        </div>
    );
}
