import React from 'react'
import { FaRobot } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
        <div className='nav flex items-center justify-between h-[100px] px-100'>
            <div className="logo flex items-center gap-[10px]">
                <i className='text-[50px] md:text-25px'><FaRobot /></i>
                <h3 className='text-[25px] font-[700]'>Chat<span className='text-purple-600'>BOT</span></h3>
            </div>

            <div className="user">
                <i className='text-[27px] cursor-pointer'><FaRegUserCircle /></i>
            </div>
        </div>

    </>
  )
}

export default Navbar