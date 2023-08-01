import React,{useEffect,useState} from 'react'
import TransForm from "./components/TransForm"
import TransTable from "./components/TransTable"
import Navbar from "./components/Navbar"
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'


function Home() {

    const Navigate = useNavigate()

    useEffect(() => {
        if(!Cookies.get("user")){
           Navigate("/login")
        }
    })

    const [currentUser,setCurrentUser] = useState("not found")

    const initialForm = {
        amount : "",
        details : "",
        date:""
    }

    useEffect(()=> {
        if(Cookies.get("user")){
        const user = JSON.parse(Cookies.get("user"))
        setCurrentUser(user)
        }
    },[])

       
        const [Form,setForm] = useState(initialForm)    
        const [transactions,settransactions] = useState([])
        const [editTrans,seteditTrans] = useState("empty")
    
        async function fetchTransactions(){
            const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions/${currentUser._id}`)
            const {data} =await res.json()
            settransactions(data)
        }
        
        useEffect(() => {
            if(currentUser !== "not found")
            fetchTransactions()
        },[currentUser])
           
        
  return (
    <div>
        <Navbar/>
        <div className="text-3xl ml-10 my-10">Welcome <span className='capitalize text-cyan-400'>{currentUser.username}</span>,</div>
        <TransForm Form={Form} fetchTransactions={fetchTransactions} initialForm={initialForm} setForm={setForm} currentUser ={currentUser}  editTrans={editTrans} seteditTrans={seteditTrans}/>
        <TransTable transactions={transactions} fetchTransactions={fetchTransactions} seteditTrans={seteditTrans}/>
    </div>
  )
}

export default Home