import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import api from "../lib/axios";
import { useNavigate } from "react-router";
import { MdKeyboardBackspace } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const NoteDetails = ({setActive}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [char, setChar] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US").format(date);

  useEffect(() => {
    const fetchNote = async () => {
      const response = await api.get(`/notes/${id}`);
      setTitle(response.data.title);
      setContent(response.data.content);
      setChar(response.data.content.length);
    };
    fetchNote();
  }, []);

  const handleAddNote = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      await api.put(`/notes/${id}`, { title, content });
      setTitle("");
      setContent("");
      setChar(0);
      toast.success("Updated")
    } catch (error) {
      toast.error("server error")
    } finally {
      setLoading(false);
      setActive("notes")
      navigate("/home/notes");
    }
  };

  const handleContent = (e) => {
    setContent(e.target.value);
    setChar(e.target.value.length);
  };

  return (
    <div className="p-4 fixed w-full h-full z-10 bg-white">
       <Toaster />
      <div className="flex justify-between">
        <span
          className="p-2 rounded-full active:bg-gray-100"
          onClick={() => navigate("/home/notes")}
        >
          <MdKeyboardBackspace className="text-2xl cursor-pointer" />
        </span>
        {loading ? (
          <span className="disabled text-xl cursor-pointer pr-2 font-bold text-slate-500">
            saving...
          </span>
        ) : (
          <span
            className="text-xl cursor-pointer pr-2 font-bold active:text-slate-600"
            onClick={handleAddNote}
          >
            save
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4 mt-4 h-full">
        <input
          placeholder="Title"
          type="text"
          className="bg-white h-15 font-bold text-3xl pl-3 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex gap-6 text-gray-600 font-bold pl-3">
          <span>{formattedDate}</span>
          <span>{char} characters </span>
        </div>
        <textarea
          placeholder="start typing.."
          name="content"
          className="bg-white pl-3 outline-none text-xl mt-3 h-full"
          value={content}
          onChange={handleContent}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteDetails;
