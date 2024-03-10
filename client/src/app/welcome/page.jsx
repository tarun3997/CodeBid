"use client";

import { useRouter } from "next/navigation";
import bg from "../../../public/bg1.jpg";
import GetStartButton from "@/components/getStartBtn";
import ProjectShowingCard from "@/components/projectShowingCard";
import { useEffect, useState } from "react";


export default function WelcomeScreen() {
  const [project, setProject]= useState([]);

  
  const router = useRouter();
  const handleGetStartedClick = () => {
    router.push("/login");
  };
  useEffect(()=>{
    const fetchProjects = async ()=>{
      try {
        const profile = await axios.get("http://localhost:4000/api/get-projects");
        
        setProject(profile.data.getProject)
        
        
      } catch (e) {
        console.error("Error fetching user count:", e);
      }
    }
    fetchProjects()
  },[]);
  return (
    <div className="">
      <div
        className="w-full h-screen p-10"
        style={{
          backgroundImage: `url(${bg.src}) `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <nav className="flex justify-between items-center">
          <span className=" text-white text-2xl font-bold font-serif ">
            CODEBID
          </span>
          <ul className="md:flex justify-center font-Archivo font-bold text-lg gap-x-20 nav-li">
            <li id="about">About</li>
            <li>Pricing</li>
            <li>Product</li>
            <li>Contacts</li>
          </ul>
          <div></div>
        </nav>
        <header className="flex flex-col  justify-center items-center h-4/5">
          <span className="text-7xl font-bold font-Play text-white">
            Revolutionary Approach{" "}
          </span>
          <span className="text-7xl font-bold mt-4 font-Play text-white">
            To Web Building
          </span>
          <div className="container flex items-center mt-8 mb-10 justify-center w-1/4">
            <span className="text-base text-center font-Play text-gray-200">
              Free yourself from financial admin. Our dedicated experts and
              easy-to-use tools make managing your money and paying the right
              tax effortless.
            </span>
          </div>
          <GetStartButton getStartedClick={handleGetStartedClick}/>
        </header>
      </div>
      <section id="about" className="bg-[#07141e] p-10">
        <div className="flex">
          <div className="w-3/6"></div>
          <div className="w-3/6 flex flex-col">
            <span className="text-white font-bold text-3xl mb-5">
              What is CODEBID
            </span>
            <span className="text-white text-sm w-10/12 mb-5 tracking-wide leading-6">
              Welcome to CODEBID, your ultimate platform for sharing, selling,
              and showcasing your creative projects! Whether you're a designer,
              developer, or enthusiast, CODEBID is your digital marketplace
              where innovation meets collaboration. Upload your designs, code
              snippets, or complete projects to reach a global audience eager to
              discover and engage with your work.<br/>Get inspired by browsing
              through a diverse range of projects, connect with fellow creators
              through seamless messaging, and even purchase projects to
              accelerate your own development journey. Join us at CODEBID and
              let your creativity thrive!
            </span>
            <GetStartButton getStartedClick={handleGetStartedClick} />
          </div>
        </div>
        <div className="flex justify-center mt-20 flex-col items-center ">
          <span className="text-white font-bold mb-5 text-4xl">Explore</span>
          <div className=" w-full flex flex-wrap justify-center">
          {project.map((projects, index)=>(
        <ProjectShowingCard key={index} project={projects}/>
        ))}
          </div>
        </div>
        
      </section>
    </div>
  );
}
