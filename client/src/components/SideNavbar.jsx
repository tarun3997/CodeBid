"use client";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { BiMessageSquareDots } from "react-icons/bi";
import { CgAddR } from "react-icons/cg";
import { Home, MoonIcon, Search, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
} from "@nextui-org/react";
import axios from "axios";
import { MdDashboard } from "react-icons/md";
import SearchPopover from "./SearchPopOver";

const CustomNavbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  const [userRole, setUserRole] = useState("USER");
  useEffect(() => {
    const isAdminLogin = async () => {
      try {
        const isAdmin = await axios.get("http://localhost:4000/api/user-role", {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        });
        setUserRole(isAdmin.data);
      } catch (e) {
        console.error("Error fetching user count:", e);
      }
    };
    isAdminLogin();
  }, []);
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    const expand_btn = document.querySelector(".expand-btn");
    const bothLine = document.querySelector(".doubleLine");
    const firstLine = document.querySelector(".firstLine");
    const secondLine = document.querySelector(".secondLine");

    expand_btn.addEventListener("click", () => {
      setCollapsed(!collapsed);
      if (collapsed) {
        bothLine.classList.add("px-6");
        firstLine.classList.remove("w-8");
        firstLine.classList.add("w-16");
        secondLine.classList.remove("w-4");
        secondLine.classList.add("w-8");
        document.body.classList.remove("collapsed");
      } else {
        bothLine.classList.remove("px-6");
        firstLine.classList.remove("w-16");
        firstLine.classList.add("w-8");
        secondLine.classList.remove("w-8");
        secondLine.classList.add("w-4");
        document.body.classList.add("collapsed");
      }
    });

    const current = window.location.href;
    const allLinks = document.querySelectorAll(".sidebar-links a");

    allLinks.forEach((elem) => {
      elem.addEventListener("click", function () {
        const hrefLinkClick = elem.href;

        allLinks.forEach((link) => {
          if (link.href === hrefLinkClick) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      });
    });

    return () => {
      expand_btn.removeEventListener("click", () => {});
    };
  }, [collapsed]);

  return (
    <div className="h-screen fixed border-r-1">
      <nav className={`sidebar h-full ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-top-wrapper">
          <button className="expand-btn" type="button">
            <svg
              width="14"
              height="14"
              className="stroke-black  dark:stroke-white"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="sidebar-links-wrapper p-0 h-full">
          <div className="sidebar-links flex flex-col justify-between h-full">
            <div className=" py-4 doubleLine flex justify-center items-center flex-col gap-[4px] ">
              <div className="flex gap-1 flex-col">
                <div className="h-1 w-8 rounded-l-full firstLine rounded-r-full "></div>
                <div className="h-1 w-4 rounded-l-full secondLine rounded-r-full"></div>
              </div>
            </div>
            <ul
              className={`${
                collapsed === true ? "items-center" : "items-start ml-4"
              } h-3/4 flex flex-col gap-6 items-start`}
            >
              {userRole === "ADMIN" || userRole === "SuperAdmin" && (
                <NavbarItems
                  icon={<MdDashboard size={22} />}
                  link={"/admin/dashboard"}
                  name={"Dashboard"}
                  title={"Dashboard"}
                  isCollapsed={collapsed}
                />
              )}
              <NavbarItems
                icon={<Home size={22} />}
                link={"/"}
                name={"Home"}
                title={"Home"}
                isCollapsed={collapsed}
              />
              <Popover placement="right">
                <PopoverTrigger>
                  <div>
                    <NavbarItems
                      icon={<Search size={22} />}
                      name={"Search"}
                      title={"Search"}
                      isCollapsed={collapsed}
                    />
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                  <SearchPopover />
                </PopoverContent>
              </Popover>

              <NavbarItems
                icon={<BiMessageSquareDots size={22} />}
                link={"/messages"}
                name={"Messages"}
                title={"Messages"}
                isCollapsed={collapsed}
              />
              <NavbarItems
                icon={<CgProfile size={22} />}
                link={"/profile"}
                name={"Profile"}
                title={"Profile"}
                isCollapsed={collapsed}
              />
              <NavbarItems
                icon={<CgAddR size={22} />}
                link={"/upload-project"}
                name={"Create"}
                title={"Create"}
                isCollapsed={collapsed}
              />
            </ul>
            <div className="mb-6 flex justify-center">
              <Switch
                defaultSelected
                size="lg"
                color="success"
                startContent={<SunIcon />}
                endContent={<MoonIcon />}
                onChange={toggleTheme}
              ></Switch>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

function NavbarItems({ title, link, icon, name, isCollapsed }) {
  return (
    <li>
      <a
        href={link}
        title={title}
        className="tooltip items-center justify-center"
      >
        {icon}
        <span
          className={`${
            isCollapsed === true ? "mr-0" : "mr-7"
          } link hide text-sm`}
        >
          {name}
        </span>
      </a>
    </li>
  );
}

export default CustomNavbar;
