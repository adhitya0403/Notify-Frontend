import { RiLogoutBoxLine } from "react-icons/ri";
import { MdOutlineContactSupport } from "react-icons/md";
import { useState } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router";
import { FaRegUserCircle } from "react-icons/fa";

const Logout = ({ profile, name }) => {
  const [view, setView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout", { withCredentials: true });
      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {}
  };

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <>
      <div className="rounded-full bg-white" onClick={() => setView(!view)}>
        <FaRegUserCircle className="text-[1.8rem] rounded-full disabled cursor-pointer" />
      </div>
      {view && (
        <div className="fixed top-[3.4rem] right-[0.6rem] w-[14rem] z-20 p-3 bg-white rounded-lg shadow-md border-1 border-slate-200">
          <div className="flex gap-3 items-center">
            <FaRegUserCircle className="text-[1.8rem] rounded-full disabled cursor-pointer" />
            <span className="font-bold">{name}</span>
          </div>
          <hr className="w-full h-[1px] mt-3 text-gray-200" />
          <ul className="w-full p-1 rounded-lg">
            <li
              className="flex gap-2 items-center p-3 cursor-pointer hover:bg-gray-100 rounded-lg"
              onClick={handleContact}
            >
              <MdOutlineContactSupport className="text-[1.2rem]" />
              <span className="font-bold">Contact me</span>
            </li>
            <li
              className="flex gap-2 items-center p-3 cursor-pointer  hover:bg-gray-100 rounded-lg"
              onClick={handleLogout}
            >
              <RiLogoutBoxLine className="text-[1.2rem]" />
              <span className="font-bold">Logout</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Logout;
