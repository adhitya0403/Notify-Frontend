import axios from "axios";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdDeleteOutline,
} from "react-icons/md";
import api from "../lib/axios";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const TaskCard = ({ id, content, setTasks, isFinished, bg }) => {
  const navigate = useNavigate();

  const handleCheck = async () => {
    try {
      await api.put(`/tasks/${id}`, { content, isFinished: true });
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, isFinished: true } : task
        )
      );
    } catch (error) {
      toast.error("failed to update task");
    }
  };

  const handleuncheck = async () => {
    try {
      await api.put(`/tasks/${id}`, { content, isFinished: false });
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, isFinished: false } : task
        )
      );
    } catch (error) {
      toast.error("failed to update task");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("Task deleted");
    } catch (error) {
      toast.error("failed to delete");
    }
  };
  return (
    <div>
      <Toaster />
      {isFinished ? (
        <div className="p-3 flex justify-between items-center m-1.5 rounded-lg cursor-pointer min-h-[4.2rem] shadow-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MdCheckBox className="text-3xl shrink-0" onClick={handleuncheck} />
            <div
              className="text-[1.4rem] flex font-bold line-through"
              onClick={() => navigate(`/home/tasks/${id}`)}
            >
              <span className="w-full break-all whitespace-normal">
                {content}
              </span>
            </div>
          </div>
          <div className="flex p-2">
            <MdDeleteOutline
              className="text-3xl shrink-0"
              onClick={handleDelete}
            />
          </div>
        </div>
      ) : (
        <div
          className={`p-3 flex justify-between items-center m-1.5 rounded-lg cursor-pointer min-h-[4.2rem] shadow-sm text-black`}
          style={{ backgroundColor: `${bg}` }}
        >
          <div className="flex items-center gap-2">
            <MdCheckBoxOutlineBlank
              className="text-3xl shrink-0"
              onClick={handleCheck}
            />
            <div
              className="flex text-[1.4rem] font-bold"
              onClick={() => navigate(`/home/tasks/${id}`)}
            >
              <span className=" w-full break-all whitespace-normal ">
                {content}
              </span>
            </div>
          </div>
          <div className="hover:bg-gray-100 p-2 rounded-full flex">
            <MdDeleteOutline
              className="text-3xl shrink-0"
              onClick={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
