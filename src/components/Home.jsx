import React from "react";
import { useState } from "react";
import Nav from "./Nav.jsx";
import SideBar from "./SideBar.jsx";
import Hero from "./Hero.jsx";
import RateLimit from './RateLimit.jsx'


const Home = ({ category,setActive, active}) => {
  const [showLimit,setShowLimit]=useState(false)
  return (
    <>
      {!showLimit ? (
        <div className="w-full h-full grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
          <div className="top-0 row-span-2">
            <SideBar active={active} setActive={setActive} />
          </div>
          <div className="sticky top-0 z-10">
            <Nav active={active} setActive={setActive} />
          </div>
          <div className="">
            <Hero category={category} setActive={setActive} setShowLimit={setShowLimit}/>
          </div>
        </div>
      ) : (
        <RateLimit />
      )}
    </>
  );
};

export default Home;
