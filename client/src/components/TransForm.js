import React, { useEffect } from 'react'
import dayjs from "dayjs"

function TransForm({Form,fetchTransactions,setForm,editTrans,initialForm,seteditTrans,currentUser}) {

    useEffect(() => {
      if(editTrans !== "empty"){
      setForm(editTrans)
      }
    },[editTrans])

    const submit = async() => {
      const res = await fetch(`${process.env.API_URL}/transactions/${currentUser._id}`,{
        method:"POST",
        body:JSON.stringify(Form),
        headers:{
         "Content-Type":"application/json"
        }
       })
        return res;
    }

    const update = async(id) => {
      const res = await fetch(`${process.env.API_URL}/transactions/${currentUser._id}/${id}` ,{
        method:"PATCH",
        body:JSON.stringify(Form),
        headers:{
         "Content-Type":"application/json"
        }
       })
        return res;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await (editTrans !== "empty" ? update(editTrans._id) : submit())
        if(res.ok){
            setForm(initialForm)
            seteditTrans("empty")
            fetchTransactions()
        }
    } 

    const setInitial = () => {
        setForm(initialForm)
        seteditTrans("empty")
    }


    function dayformat(date){
      return dayjs(date).format("YYYY-MM-DD")
    }



  return (
    <div className="px-20">
        <div className="text-xl pb-4 text-center tracking-wide">{editTrans !== "empty" ? "Update" : "New"} Transaction</div>
        <form onSubmit={handleSubmit}>
          <div  className="flex flex-row max-w-[1000px] shadow shadow-cyan-400 mx-auto bg-slate-100 text-black p-5 justify-between items-center rounded-md">
          <div>
            <label className=''>Amount</label><br/>
            <input className="p-2 rounded-md" type="number" value={Form.amount} onChange={(e) => setForm({...Form,amount:e.target.value})} placeholder='enter transaction amount'/>
          </div>
          <div>
            <label>Details</label><br/>
            <input type="text"  className="p-2 rounded-md" value={Form.details}  onChange={(e) => setForm({...Form,details:e.target.value})} placeholder='enter transaction details'/>
          </div>
          <div>
            <label>Date</label><br/>
            <input type="date"  className="p-2 rounded-md" value={dayformat(Form.date)}   onChange={(e) => setForm({...Form,date:e.target.value})}/>
          </div>
          {
          editTrans !== "empty" ? 
          <input type="submit" value="update" className='h-fit p-2 rounded-md uppercase cursor-pointer bg-cyan-400 hover:bg-[#263238] hover:text-white'/> :
          <input type="submit" value="submit" className='h-fit p-2 rounded-md uppercase cursor-pointer bg-cyan-400 hover:bg-[#263238] hover:text-white'/> 
          }         
          <div onClick={setInitial} className='h-fit p-2 rounded-md uppercase cursor-pointer bg-cyan-400 hover:bg-[#263238] hover:text-white'>cancel</div>
          </div>
        </form>
        
       
    </div>
  )
}

export default TransForm;