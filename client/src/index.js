import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import App from "./app"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import Login from "./Login"
import Register from './Register'
import dotenv from "dotenv"

dotenv.config()

const router = createBrowserRouter([{
    path:"/",
    element:<App/>,
    children:[
    {
        path:"",
        element:<Home/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
    ]

}])
ReactDOM.createRoot(document.getElementById("root")).render(
     <RouterProvider router={router}/>
)