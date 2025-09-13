import React from 'react'

const Contact = () => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
        <div className='w-[21rem] flex flex-col shadow-md border-1 border-gray-200 p-8 items-center rounded-lg'>
            <h1 className='text-4xl mb-4 font-bold text-blue-500'>Feedback</h1>
            <p className='mb-4'>Hello, I'm Adhitya Darshanala interested in building cool stuff <br/> if you are interested you can contact me</p>
            <p>email : <span className='text-blue-500'>darshanalaadhitya@gmail.com</span></p>
        </div>
    </div>
  )
}

export default Contact
