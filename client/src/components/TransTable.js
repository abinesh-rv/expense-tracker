import React from 'react'
import {MdModeEdit,MdDelete} from "react-icons/md"
import dayjs from "dayjs"

function TransTable({transactions,fetchTransactions,seteditTrans}) {

  const remove = async (id) => {

    if(!window.confirm("Are you sure want to delete")) return;

    const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`,{
      method:"DELETE",
    })
    if(res.ok){
       await fetchTransactions();
       window.alert("Successfully deleted")
    }
  }

  function dayformat(date){
     return dayjs(date).format("DD MMM,YYYY")
  }

  return (
  <div>
    <div className="text-xl pb-4 text-center py-4 tracking-wide">Transactions list</div>
    <table className=" mx-auto text-left bg-slate-100 shadow shadow-cyan-400 rounded-md text-black overflow-hidden">
      <thead className='uppercase'>
        <tr className="border-b border-black bg-cyan-400">
          <th scope="col" className='px-6 py-4'>amount</th>
          <th scope="col" className='px-6 py-4'>details</th>
          <th scope="col" className='px-6 py-4'>date</th>
          <th scope="col" className="px-6 py-4">options</th>
        </tr>
      </thead>
      <tbody>{transactions.map((trx) => (
          <tr key={trx._id} className='border-b border-black'>
              <td className='px-6 py-4'>{trx.amount}</td>
              <td className='px-6 py-4'>{trx.details}</td>
              <td className='px-6 py-4'>{dayformat(trx.date)}</td>
              <td className='px-6 py-4 flex justify-around items-center cursor-pointer'>
                <MdModeEdit size={20} className="text-cyan-800 hover:text-black" onClick={() => seteditTrans(trx)}/>
                <MdDelete size={20} className="text-red-800 hover:text-black" onClick={() => remove(trx._id)}/>
              </td>
          </tr>
          
            )) }
      </tbody>
    </table>
  </div>
  )
}

export default TransTable