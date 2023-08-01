import React from 'react'
import {TbMoneybag} from "react-icons/tb"
import Cookies from 'js-cookie'
import {useNavigate} from "react-router-dom"

function Navbar() {
  
  const Navigate = useNavigate()
  const handleLogOut = () => {
    Cookies.remove("user")
    Navigate("/login")
  }
  
  return (
    <div className='p-5 flex items-center justify-between  text-cyan-900 uppercase bg-white rounded-b-md mb-5 '>

      <div className="flex items-center  text-[2.1rem]">
        <TbMoneybag size="40  "/>
        <div className='font-thin'>RV-Expense</div>
      </div>
      <div onClick={handleLogOut} className='h-fit p-2 rounded-md uppercase cursor-pointer font-semibold bg-cyan-400 hover:bg-[#263238] hover:text-white'>Logout</div>


  </div>
  ) 
}

export default Navbar