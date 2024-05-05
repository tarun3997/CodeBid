"use client"
import ProjectShowingCard from "@/components/projectShowingCard";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SavedPost() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        userProject()
    },[])
    const userProject = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/saved-post`,
            {
              headers: {
                authToken: localStorage.getItem("authToken"),
              },
            }
          );

          setProjects(response.data);
        } catch (e) {
          console.error("Error fetching user count:", e);
              if (e.response && e.response.data) {
                setError(e.response.data.message);
              } else {
                setError("An error occurred while fetching projects");
              }
        }finally{
          setLoading(false)
        } 
      };
    return(
        <div className="flex h-screen">
            <div className="w-[12%]"></div>
            <div className="flex w-full flex-col my-5 ">
                <span className="text-xl font-bold  mb-3 text-center">Saved Post</span>
                <div className="px-6 h-full w-full flex gap-2 flex-wrap">

                {loading ? (<div className=" h-screen w-full flex justify-center items-center">
                  <Spinner />
                </div>) : ( projects.length === 0 ? <div className="m-auto">No Post Saved</div> 
                : projects.map((userProjects, index) => (
                  <ProjectShowingCard
                    key={index}
                    project={userProjects}
                    fetchProject={userProject}
                  />
                )))
                }
                </div>
            </div>
        </div>
    )
}