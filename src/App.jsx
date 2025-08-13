import LandPage from "./components/LandPage.jsx";
import Home from "./components/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";
import AddNote from "./components/AddNote.jsx";
import TaskDetails from "./components/TaskDetails.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import Contact from "./components/Contact.jsx";
import NoteDetails from './components/NoteDetails.jsx'
import OAuth from "./components/OAuth.jsx";

const App = () => {
  const [active, setActive] = useState("tasks");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/oauth" element={<OAuth/>} />
          <Route path="/home/tasks" element={<Home active={active} setActive={setActive} category="tasks" />} />
          <Route path="/home/notes" element={<Home active={active} setActive={setActive} category="notes" />} />
          <Route path="/home/notes/addnote" element={<AddNote setActive={setActive}/>} />
          <Route path="/home/notes/:id" element={<NoteDetails setActive={setActive}/>} />
          <Route path="/home/tasks/:id" element={<TaskDetails setActive={setActive}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
