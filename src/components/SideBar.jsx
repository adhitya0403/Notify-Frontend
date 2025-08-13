import React from "react";
import { useState } from "react";
import { RiTaskLine, RiTaskFill } from "react-icons/ri";
import { FaNoteSticky, FaRegNoteSticky } from "react-icons/fa6";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import api from "../lib/axios";

const SideBar = ({ active, setActive }) => {

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout",{ withCredentials: true });
      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <div className="bg-white h-screen  w-[5rem] 2xl:w-[12em] border-gray-600 border-r-1 hidden flex-col items-center pt-[1rem] text-white gap-[4rem] lg:flex sticky --webkit-sticky top-0">
      <h1 className="font-test text-6xl text-black hidden 2xl:block">Notify</h1>
      <h1 className="font-test text-6xl text-black 2xl:hidden">N</h1>
      <div className="h-full w-full flex flex-col items-center justify-between pb-[1rem]">
        <ul className="flex flex-col gap-[0.5rem] justify-center w-full">
          <Link to="/home/tasks">
            <li
              onClick={() => setActive("tasks")}
              className={`mx-[0.6rem] rounded-xl flex justify-center items-center gap-[0.5rem] text-[1.2rem] font-bold p-[1rem] cursor-pointer text-black hover:bg-slate-100 active:bg-slate-200`}
            >
              {active === "tasks" ? (
                <RiTaskFill className="text-[1.8rem] " />
              ) : (
                <RiTaskLine className="text-[1.8rem]" />
              )}
              <span className="hidden 2xl:block">Tasks</span>
            </li>
          </Link>
          <Link to="/home/notes">
            <li
              onClick={() => setActive("notes")}
              className={`mx-[0.6rem] rounded-xl flex justify-center items-center gap-[0.5rem] text-[1.2rem] font-bold p-[1rem] cursor-pointer text-black hover:bg-slate-100 active:bg-slate-200`}
            >
              {active === "notes" ? (
                <FaNoteSticky className="text-[1.8rem]" />
              ) : (
                <FaRegNoteSticky className="text-[1.8rem]" />
              )}
              <span className="hidden 2xl:block">Notes</span>
            </li>
          </Link>
        </ul>
        <ul className="w-full flex flex-col justify-center">
          <li
            onClick={handleLogout}
            className={`mx-[0.2rem] rounded-xl flex justify-center items-center gap-[0.5rem] text-[1.2rem] font-bold p-[1rem] cursor-pointer text-black hover:bg-slate-100 active:bg-slate-200`}
          >
            {active === "account" ? (
              <FaUserCircle className="text-[1.8rem]" />
            ) : (
              <FaRegUserCircle className="text-[1.8rem]" />
            )}
            <span className="hidden 2xl:block">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
