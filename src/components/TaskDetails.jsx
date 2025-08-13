import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../lib/axios";
import Modal from "react-modal";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const TaskDetails = ({ setActive }) => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTask, setShowTask] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await api.get(`/tasks/${id}`);
      setContent(response.data.content);
    };
    setShowTask(true);
    fetchTask();
  }, []);

  const handleContent = async () => {
    if (!content.trim()) {
      alert("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      await api.put(`/tasks/${id}`, { content });
      setContent("");
      toast.success("updated")
    } catch (error) {
      toast.error("server error")
    } finally {
      setLoading(false);
      setShowTask(false);
      setActive("tasks");
      navigate("/home/tasks");
    }
  };

  return (
    <Modal
      isOpen={showTask}
      onRequestClose={setShowTask}
      className="w-full h-full flex justify-center items-end lg:items-center"
      overlayClassName="fixed inset-0 bg-white/60 z-100"
      ariaHideApp={false}
    >
      <div className="bg-white p-3 rounded-lg w-[30rem] h-[10rem] flex flex-col justify-between shadow-lg border-[0.1px] border-slate-100 mb-6 lg:mb-0">
        <Toaster />
        <input
          placeholder="Enter task"
          type="text"
          className="w-sm h-10 outline-none pl-2 text-xl mt-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-between p-3 items-center font-bold text-[1.2rem]">
          <button
            className="cursor-pointer"
            onClick={() => navigate("/home/tasks")}
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
    </Modal>
  );
};

export default TaskDetails;
