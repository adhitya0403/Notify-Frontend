import React from 'react'
import { MdBlock } from "react-icons/md";

const RateLimit = () => {
  return (
    <div className='flex justify-between items-center w-[80%] h-[6rem] md:w-[60%] lg:w-[50%] lg:h-[8rem] 2xl:w-[38%] mx-auto mt-1 border-1 border-slate-600 rounded-lg p-4 bg-slate-100'>
      <div className='text-5xl pl-1 lg:text-7xl lg:pl-[3%] text-red-400'><MdBlock/></div>
      <div className='w-full flex flex-col items-center'>
        <h1 className='text-2xl lg:text-3xl font-bold'>Rate limit exceeded</h1>
        <p className='text-[1rem] lg:text-[1.2rem]'>Please wait a few minutes then try again</p>
      </div>
    </div>
  )
}

export default RateLimit
