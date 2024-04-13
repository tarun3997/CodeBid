"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Spinner } from "@nextui-org/react";
import ProjectShowingCard from "@/components/projectShowingCard";
import { useRouter } from "next/navigation";

export default function UserProfile({ params }) {
  const [profile, setProfile] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { name } = params;

  useEffect(() => {
    fetchProfile();
    userProject();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/user-profile/${name}`,
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
      setProfile(response.data.userProfile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("An error occurred while fetching user profile.");
    } finally {
      setLoading(false);
    }
  };

  const userProject = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/user-post/${name}`,
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
      setProjects(response.data.userProject);
    } catch (e) {
      console.error("Error fetching user count:", e);
          if (e.response && e.response.data) {
            setError(e.response.data.message);
          } else {
            setError("An error occurred while fetching projects");
          }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen w-full"><Spinner label="Loading..." /></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen w-full">{error}</div>;
  }

  return (
    <div className="w-full h-screen">
        <div className="flex w-full">
          <div className="w-[10%]"></div>
          <div className="w-full h-screen flex">
            <div className="flex justify-center items-center w-full flex-col px-4 ">
              <div className="flex">
                <div className="flex gap-10">
                  <Avatar
                    src={`http://localhost:4000${profile.profileUrl}`}
                    className="w-40 h-40 text-large"
                  />

                  <div className="flex flex-col gap-3">
                    <div className="flex gap-20">
                      <div className="font-bold  text-sm">
                        {profile.username}
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="font-light ">
                        <span className="text-sm font-normal">
                          {profile.totalFollower}
                        </span>{" "}
                        Follower
                      </div>
                      <div className="font-light text-sm ">
                        <span className="text-sm font-normal">
                          {profile.totalFollowing}
                        </span>{" "}
                        Following
                      </div>
                    </div>
                    <div className="">{profile.name}</div>
                    <div className="flex  flex-col gap-1">
                      <div className="font-semibold ">Bio</div>
                      <div className="max-w-[350px]  text-sm">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Dolorum id
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[0.5px] dark:bg-white bg-black w-full mt-6 mb-3"></div>
              <span className="font-normal mb-2 hover:font-semibold text-start ">
                Project
              </span>
              <div className="px-6 w-full flex gap-2 flex-wrap">
                {projects.map((userProjects, index) => (
                  <ProjectShowingCard
                    key={index}
                    project={userProjects}
                    fetchProject={userProject}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
