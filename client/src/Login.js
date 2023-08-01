import React, { useState,useEffect } from 'react'
import {TbMoneybag} from "react-icons/tb"
import {LuEye,LuEyeOff} from "react-icons/lu"
import {Link, useNavigate} from "react-router-dom"
import { Toaster, toast } from 'react-hot-toast';
import Cookie from "js-cookie"


function Login() {

  const navigate = useNavigate()

  useEffect(() => {
      if(Cookie.get("user")){
         navigate("/")
      }
  })

  const [showPass,setshowPass] = useState(false)

  useEffect(() => {
    if(Cookie.get("user")){
      navigate("/")
    }
  })

  const initialForm = {
    email:"",
    password:"",
  }
  
  const [value,setvalue] = useState(initialForm)

  const handleSubmit = async (e) => {

    e.preventDefault()

    const {password,email} = value

    const toastError = {
      position:"bottom-right",
      duration:3000,
    }

    if(handleValidation()){ 
      const res = await fetch(`${process.env.API_URL}/auth/Login`,{
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body:JSON.stringify({
          email,password
        })
      })
      const data =await res.json()
      if(!data.status){
        toast.error(data.msg,toastError)
      }
      else{
        const user = JSON.stringify(data.user)
        Cookie.set("user",user)
        navigate("/")
      }
    }
  }

  const toastError = {
    position:"bottom-right",
    duration:2000
  }
   
  const handleValidation = () => {
    const {password} = value
    if(password.length < 6 ){
      toast.error("password length must be greater than 5",toastError)
      return false
    }
    return true
    
  }

  const handleShow = (e) => {
      setshowPass(!showPass)
    }


  const handleChange = (e) => {
    setvalue({...value,[e.target.name]:e.target.value})
  }

  return (
    <div>
      <div className='w-[500px] mx-auto  rounded-md mt-[200px] py-10 bg-cyan-700'>
      <div className="flex items-center justify-center mb-4  text-[2.1rem]">
        <TbMoneybag size="40 "/>
        <div className='font-thin'>RV-Expense</div>
      </div>
      <form className='flex flex-col mx-24 gap-6 text-gray-300' onSubmit={handleSubmit}>
       <input type="text" name='email' required placeholder='email' className='rounded-md px-4 py-2 text-slate-800  border-2 ' onChange={(e) =>handleChange(e)}/>
       <div className='rounded-md px-4 py-2 text-slate-800 bg-white border-2  flex justify-between items-center hover:ring-black hover:ring-1 hover:border-transparent'>
       <input type={showPass ? "text" : "password"} name='password' className=' focus:outline-none' required placeholder='password'  onChange={(e) =>handleChange(e)}/>
       <span className='text-cyan-700 cursor-pointer hover:text-black' onClick={(e) => handleShow(e)}>{showPass ? <LuEyeOff size={20}/> : <LuEye size={20}/>}</span>
       </div>
       <button type="submit" className='uppercase text-lg bg-white rounded-md py-1 tracking-wide text-black hover:bg-black hover:text-white transition ease-in-out duration-300' >login</button>
      </form>
      <div className='text-center mt-5'>Don't have an account? <Link to="/register" className='uppercase text-lg tracking-wide hover:text-dark  transition ease-in-out duration-300'> register</Link></div>
    </div>
     <Toaster/>
    </div>
  )
}

export default Login