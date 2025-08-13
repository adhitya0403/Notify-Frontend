import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import api from "../lib/axios";
import axios from "axios";
import { useNavigate } from "react-router";
import { formatDate } from "../lib/formatDate";
import toast, { Toaster } from "react-hot-toast";



const NoteCard = ({ title, content, id, date, setNotes,bg}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted");
      // Optionally, you can call a function to refresh the notes list
    } catch (error) {
        toast.error("server error")
    }
  };

  return (
    <div className={`p-4 m-1 rounded-2xl cursor-pointer h-[10rem] lg:h-[11rem] flex flex-col justify-between shadow-sm border-[0.1px] border-gray-100`} style={{backgroundColor:`${bg}`}}>
       <Toaster />
      <div onClick={() => navigate(`/home/notes/${id}`)}>
        <h1 className="font-bold text-[1.2rem] text-black">{title}</h1>
        <p className="text-[1rem] text-gray-700 pt-3">
          {content?.slice(0, 50)}...
        </p>
      </div>
      <div className="text-[0.8rem] flex justify-between items-center lg:text-[1rem] text-black">
        <span className="font-bold">{formatDate(new Date(date))}</span>
        <div
          className="flex justify-between items-center gap-3 text-2xl z-2 p-2 hover:bg-gray-100 rounded-full"
          onClick={handleDelete}
        >
          <MdDeleteOutline />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
