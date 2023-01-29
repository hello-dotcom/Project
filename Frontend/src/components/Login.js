import React from "react";
import {useForm}from 'react-hook-form'
import './Login.css'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';
function Login(props){
    let cookie = new Cookies();
    const history = useNavigate();
    let {register,handleSubmit,formState:{errors}}=useForm()
    let fun=(data)=>{
        console.log(data)
       fetch("http://127.0.0.1:8000/login/",{
         method:'POST',
         headers:{'Content-Type':'application/json'},
         body:JSON.stringify(data),
       })
       .then(res=>res.json())
       .then(resobj=>{console.log(resobj)
        alert(resobj.message)
        cookie.set('token',resobj.tokens.access)
        
        cookie.set('home',true);
        history('/uHome');
        })
       .catch(err=>console.log(err))
    }
    return(
        <div className="p-5 back">
        <div className="Log  text-center ">
            <h3>LOGIN</h3>
            <form onSubmit={handleSubmit(fun)} className='for expand mx-auto m-5'> 
            <input type="text" placeholder='Email' className='form-control  fs-4' {...register("email")} >
            
            </input>
            <input type="password" placeholder='Password' className='form-control  fs-4' {...register("password")} >
            
            </input>
            <button  type='submit' className='btn btn-success fs-5 mt-3 p-2'>
            submit
         </button>
         <br></br>
         <br></br>
         </form>
        </div>
        </div>
    )
}
 export default Login