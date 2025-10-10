import React from "react";
import { useNavigate } from "react-router";

const LandPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[url(/bg2.jpg)] bg-cover bg-center w-full h-full flex items-center justify-center">
      <nav className="fixed top-2 flex w-full px-4 justify-between items-center">
        <div
          className="font-test text-[2rem] md:text-[3.2rem] text-white stroke-black stroke-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Notify
        </div>
        <button
          className="border-white border-1 text-white font-poppins w-[6rem] h-[2.8rem] rounded-4xl md:h-[3rem] text-[1rem] hover:bg-white hover:text-[#110f0d] cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </nav>
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center font-test text-white text-[3rem] md:text-[6rem]">
          <p className="border-1">Your</p>
          <p className="border-1">Tasks and Notes</p>
          <p className="border-1">Manager</p>
        </div>
        <button
          className="w-[8rem] h-[3.2rem] border-white border-1 text-white font-poppins md:w-[10rem] rounded-4xl md:h-[3.5rem] text-[1rem] hover:bg-white hover:text-[#110f0d] cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandPage;
