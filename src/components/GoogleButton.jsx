import React from 'react'
import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({text}) => {
  return (
    <div className='w-full h-full p-2 bg-white border-1 border-black cursor-pointer active:bg-slate-200'>
      <div className='flex gap-2 items-center justify-center'><FcGoogle className='text-2xl'/><span>{text}</span></div>
    </div>
  )
}

export default GoogleButton
