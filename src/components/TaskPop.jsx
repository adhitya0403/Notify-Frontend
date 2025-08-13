import React from "react";
import AddTask from "./AddTask";
import Modal from "react-modal";

const TaskPop = ({showAddTask,setShowAddTask,fetchTasks,setActive,category}) => {
  return (
    <Modal
      isOpen={showAddTask}
      onRequestClose={() => setShowAddTask(false)}
      className="w-full h-full flex justify-center items-end lg:items-center"
      overlayClassName="fixed inset-0 bg-white/60 z-100"
      ariaHideApp={false}
    >
      {category == "tasks" && (
        <AddTask
          setShowAddTask={setShowAddTask}
          fetchTasks={fetchTasks}
          setActive={setActive}
        />
      )}
    </Modal>
  );
};

export default TaskPop;
