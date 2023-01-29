import React from "react"
import './App.css';
import {createBrowserRouter,Routes,Route,RouterProvider} from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'
import Login from './components/Login'
import Signin from './components/Signin'
import Rootlayout from "./components/Rootlayout";
import Myprofile from "./components/Myprofile";
import UserHome from "./components/UserHome";
import Order from "./components/Order";
import OrderDetails from "./components/OrderDetails"
import Logout from "./components/Logout";


function App(props) {
  const rou=createBrowserRouter([
    {
      path:"/",
      element:<Rootlayout/>,
      children:[
        {
          path:"/",
          element:<Home></Home>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/signin",
          element:<Signin></Signin>
        },
        {
          path:"/cart",
          element:<Cart></Cart>
        },
        {
          path:"/profile",
          element:<Myprofile></Myprofile>
        },
        {
          path:"/uHome",
          element:<UserHome></UserHome>
        },
        {
          path:"/order",
          element:<Order></Order>
        },
        {
          path:"/orderDetails",
          element:<OrderDetails></OrderDetails>
        },
        {
          path:"/logout",
          element:<Logout></Logout>
        }

      ]
    },
  ])
    return (
      <RouterProvider router={rou}/>
    )
  }
  
  export default App;
  
