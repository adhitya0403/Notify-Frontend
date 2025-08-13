import React from "react";
import { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { RiTaskLine, RiTaskFill } from "react-icons/ri";
import { FaNoteSticky, FaRegNoteSticky } from "react-icons/fa6";
import { Link } from "react-router";
import Logout from "./Logout";
import api from "../lib/axios";

const Nav = ({ active, setActive }) => {
  const [user, setUser] = useState("");

  const userInfo = async () => {
    const user = await api.get("/auth/getuser");
    setUser(user.data);
  };

  useEffect(() => {
    userInfo();
  }, []);

  return (
    <div className="h-[3.2rem] flex justify-end items-center lg:p-[0.4rem] lg:border-b-1 lg:border-gray-300">
      <ul className="w-full flex gap-[0.5rem] justify-center items-center text-black ml-[2rem] lg:hidden">
        <Link to="/home/tasks">
          <li
            onClick={() => setActive("tasks")}
            className={`mx-[0.6rem] rounded-xl flex justify-center items-center gap-[0.5rem] text-[1.2rem] font-bold p-[0.5rem] cursor-pointer text-black hover:bg-slate-100 active:bg-slate-200`}
          >
            {active === "tasks" ? (
              <RiTaskFill className="text-[1.6rem] md:text-[1.8rem]" />
            ) : (
              <RiTaskLine className="text-[1.6rem] md:text-[1.8rem]" />
            )}
            <span className="hidden 2xl:block">Tasks</span>
          </li>
        </Link>
        <Link to="/home/notes">
          <li
            onClick={() => setActive("notes")}
            className={`mx-[0.6rem] rounded-xl flex justify-center items-center gap-[0.5rem] text-[1.2rem] font-bold p-[0.5rem] cursor-pointer text-black hover:bg-slate-100 active:bg-slate-200`}
          >
            {active === "notes" ? (
              <FaNoteSticky className="text-[1.6rem] md:text-[1.8rem]" />
            ) : (
              <FaRegNoteSticky className="text-[1.6rem] md:text-[1.8rem]" />
            )}
            <span className="hidden 2xl:block">Notes</span>
          </li>
        </Link>
      </ul>
      <div className="w-[2.4rem] h-[2.4rem] mr-[1rem] flex justify-center items-center  bg-white rounded-full">
        <Logout profile={user.profile} name={user.username} />
      </div>
    </div>
  );
};

export default Nav;
