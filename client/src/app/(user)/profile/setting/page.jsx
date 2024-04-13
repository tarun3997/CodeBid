"use client";

import { CgProfile } from "react-icons/cg"; 
import React from "react";
import General from "@/components/setting-items/General";
import Password from "@/components/setting-items/Password";
import Help from "@/components/setting-items/help";
import Terms from "@/components/setting-items/Terms";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import EditProfile from "@/components/setting-items/EditProfile";
import { Avatar, BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { HomeIcon } from "lucide-react";

const Setting = () => {
  const items = [
    {
      name: "General",
      component: General,
      href: "general",
    },
    {
      name: "Edit profile",
      component: EditProfile,
      href: "edit",
    },
    {
      name: "Password",
      component: Password,
      href: "password",
    },
    {
      name: "Help",
      component: Help,
      href: "help",
    },
    {
      name: "Terms",
      component: Terms,
      href: "terms",
    },
    {
      name: "Delete",
      desc: "delete your account",
      href: "Delete",
    },
  ];

  const query = useSearchParams();
  const href = query.get("href");

  return (
    <div className=" h-screen flex items-center justify-center">
      <div>
        <div className="flex bg-purple-500 p-4 rounded-3xl items-center justify-start gap-4">
        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />

          <div>
            
            <Breadcrumbs>
              <BreadcrumbItem >Username</BreadcrumbItem>
              <BreadcrumbItem >{items.map((item) => {
                if (item.href === href) return item.name;
              })}</BreadcrumbItem>
            </Breadcrumbs>
            <div className="text-gray-500">
              {items.map((item) => {
                if (item.href === href) return item.desc;
              })}
            </div>
          </div>
        </div>
        <div className="flex bg-blue-400 w-full gap-20 mt-6">
          <div className=" h-[400px] flex flex-col gap-3 rounded-2xl text-gray-500">
            {items.map((item) => {
              return (
                <Link
                  href={`${
                    item.href === "Delete"
                      ? "setting/Delete"
                      : `?href=${item.href}`
                  }`}
                  className={` ${
                    item.href === "delete"
                      ? "text-red-500 hover:text-red-400"
                      : "hover:text-slate-800"
                  }  justify-start ${
                    href === item.href ? "font-bold text-black" : null
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div>
            {items.map((item) => {
              if (item.href === href) {
                return <item.component />;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
