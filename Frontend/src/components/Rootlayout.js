import React from "react";
import Navbars from './Navbars'
import Footer from './Footer'
import { Outlet } from "react-router-dom";
import "./Rootlayout.css"
function Rootlayout(){
    return(
        <div>
           <Navbars></Navbars>
           <div className="out">
           <Outlet></Outlet>
           </div>
           
        </div>
    )
}
 export default Rootlayout