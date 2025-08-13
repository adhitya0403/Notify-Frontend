import React from "react";
import { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router";
import axios from "axios";
import api from "../lib/axios";
import toast, { Toaster } from "react-hot-toast";

const AddNote = ({ setActive }) => {
  const [char, setChar] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setloading] = useState(false);
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US").format(date);
  const navigate = useNavigate();

  const handleContent = (e) => {
    setContent(e.target.value);
    setChar(e.target.value.length);
  };

  const handleAddNote = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in all fields");
      return;
    }
    try {
      setloading(true);
      await api.post("/notes", { title, content });
      setActive("notes");
      toast.success("Note added");
      navigate("/home/notes");
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      } else {
        toast.error("server error");
      }
    }
  };

  return (
    <div className="p-3 fixed w-full h-full z-10 bg-white">
      <Toaster />
      <div className="flex justify-between">
        <span
          className="p-2 rounded-full active:bg-gray-100"
          onClick={() => navigate("/home/notes")}
        >
          <MdKeyboardBackspace className="text-2xl cursor-pointer" />
        </span>
        {loading ? (
          <span className="disabled text-[1.1rem] cursor-pointer pr-2 font-bold text-slate-500">
            saving...
          </span>
        ) : (
          <span
            className="text-[1.1rem] cursor-pointer pr-2 font-bold active:text-slate-600"
            onClick={handleAddNote}
          >
            save
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-1">
        <input
          placeholder="Title"
          type="text"
          className="bg-white h-15 font-bold text-[1.3rem] pl-3 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="text-[0.8rem] flex gap-6 text-gray-600 font-bold pl-3">
          <span>{formattedDate}</span>
          <span>{char} characters </span>
        </div>
        <textarea
          placeholder="start typing.."
          name="content"
          className="bg-white pl-3 outline-none text-[1.1rem] mt-2"
          value={content}
          onChange={handleContent}
        ></textarea>
      </div>
    </div>
  );
};

export default AddNote;
