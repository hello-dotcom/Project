import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
function Logout()
{
    let cookie = new Cookies();
    let history = useNavigate();
    useEffect(()=>{
        cookie.set('home','true')
        cookie.remove('token');
        history('/')
    },[])
    return(
        <div>
            
        </div>
   
    )
}
export default Logout