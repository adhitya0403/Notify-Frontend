import { TiPlus } from "react-icons/ti";
import NoteCard from "./NoteCard.jsx";
import TaskCard from "./TaskCard.jsx";
import AddNote from "./AddNote.jsx";
import AddTask from "./AddTask.jsx";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import api from "../lib/axios.js";
import { useNavigate } from "react-router";
import emptyImg from "/empty.png";
import TaskPop from "./TaskPop.jsx";

const Hero = ({ category, setActive, setShowLimit }) => {
  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const navigate = useNavigate();

  const handlePop = () => {
    if (category === "notes") {
      navigate("/home/notes/addnote");
    } else {
      setShowAddTask(true);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      const notes = res.data;
      setNotes(notes);
    } catch (error) {
      if (error.response.status === 429) {
        setShowLimit(true);
      }
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      const tasks = res.data;
      setTasks(tasks);
    } catch (error) {
      if (error.response.status === 429) {
        setShowLimit(true);
      }
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchTasks();
  }, []);

  return (
    <div className="bg-white h-full w-full relative">
      {category === "tasks" &&
        (tasks.length === 0 ? (
          <div className="w-full h-full text-gray-500 py-8 text-2xl flex flex-col items-center gap-4 justify-center">
            <img src={emptyImg} alt="" className="w-3xs" />
            <span>No tasks found</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                content={task.content}
                setTasks={setTasks}
                id={task._id}
                isFinished={task.isFinished}
                fetchTasks={fetchTasks}
                bg={task.bg}
              />
            ))}
          </div>
        ))}
      {category === "notes" &&
        (notes.length === 0 ? (
          <div className="w-full h-full text-gray-500 py-8 text-2xl flex flex-col items-center gap-4 justify-center">
            <img src={emptyImg} alt="" className="w-3xs" />
            <span>No notes found</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-0 content-start">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                content={note.content}
                date={note.createdAt}
                fetchNotes={fetchNotes}
                id={note._id}
                setNotes={setNotes}
                bg={note.bg}
              />
            ))}
          </div>
        ))}

      <button
        className="fixed bottom-14 right-5 lg:right-8 z-5 bg-black p-2.5 rounded-full text-5xl cursor-pointer"
        onClick={handlePop}
      >
        <TiPlus className="text-white" />
      </button>
      <div className="bg-amber-400 mx-2">
        <TaskPop category={category} setActive={setActive} fetchTasks={fetchTasks} setShowAddTask={setShowAddTask} showAddTask={showAddTask} />
      </div>
    </div>
  );
};

export default Hero;
