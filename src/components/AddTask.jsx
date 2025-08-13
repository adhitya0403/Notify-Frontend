import React from "react";
import { useState } from "react";
import axios from "axios";
import api from "../lib/axios";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const AddTask = ({ setShowAddTask, fetchTasks, setActive }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContent = async () => {
    if (!content.trim()) {
      alert("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      await api.post("/tasks", { content });
      toast.success("Task added");
      setContent("");
      setShowAddTask(false);
      fetchTasks();
      setActive("tasks");
      navigate("/home/tasks");
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      } else {
        toast.error("server error");
      }
    }
  };

  return (
    <div className="bg-white p-3 rounded-lg w-[21rem] h-[10rem] flex flex-col justify-between shadow-lg border-[0.1px] border-slate-100 mb-8 lg:mb-0 lg:w-[22rem]">
      <Toaster />
      <textarea
        placeholder="Enter task"
        className="w-full h-full outline-none pl-2 text-xl mt-2"
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />  
      <div className="flex justify-between p-3 items-center font-bold text-[1.2rem]">
        <button
          className="cursor-pointer"
          onClick={() => setShowAddTask(false)}
        >
          Cancel
        </button>
        {loading ? (
          <button className="pr-2 disabled text-gray-400">Adding...</button>
        ) : (
          <button
            className="cursor-pointer pr-2 active:text-gray-400"
            onClick={handleContent}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default AddTask;
