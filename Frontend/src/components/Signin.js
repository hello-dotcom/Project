import React from "react";
import './Signin.css'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
function Signin(){
    let {register,handleSubmit,formState:{errors}}=useForm()
    const history = useNavigate();
    let fun=(data)=>{
        console.log(data)
        const phoneregex = /^[1-9][0-9]{9}$/;
		const emailregex = /^([a-z0-9A-Z\.-]+)@([a-z0-9A-Z-]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;
		const passwordregex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+()]).{8,20}$/;
        if(data.email.trim()!="" && data.username.trim()!="" && data.name.trim()!="" && data.address.trim()!="" && data.password.trim()!="" && data.phone_number.trim()!=""){


            if(!emailregex.test(data.email)){
                alert('email is not valid')
            }
            else if(!phoneregex.test(data.phone_number)){
                alert('phone number is not valid')
            }
            else if(!passwordregex.test(data.password)){
                alert('password must have a number, one uppercase ,one lower case letter and one special character')
            }
            else{
                fetch("http://127.0.0.1:8000/signup/",{
                method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(data)
                })
                .then(res=>res.json())
                .then(resobj=>{
                    console.log(resobj)
                    if(resobj["errors"]!==undefined){
                        alert(resobj.errors)
                    }
                    else if(resobj["message"]!==undefined){
                        alert(resobj.message);
                        history('/')
                    }
                   
                })

                .catch(err=>console.log(err))
            }
            
        }
        else{
            alert('fields should not be empty')
        }
       
    }
    return(
        <div className="p-5">
        <div className="Sign text-center">
            <h3>CREATE ACCOUNT</h3>
            <form onSubmit={handleSubmit(fun)} className='for expand mx-auto m-5'> 
            <input type="text" placeholder='Email' className='form-control  fs-4' {...register("email")} >
            
            </input>
            <input type="text" placeholder='Username' className='form-control  fs-4' {...register("username")} >
            
            </input>
            <input  type="text" placeholder='Name' className='form-control  fs-4' {...register("name")}>
            
            </input>
            <input  type="text" placeholder='Address' className='form-control  fs-4' {...register("address")}>
            
            </input>
            <input type="password" placeholder='Password' className='form-control  fs-4' {...register("password")} >
            
            </input>
            <input type="text" placeholder='Phone Number' className='form-control  fs-4' {...register("phone_number")} >
            
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
 export default Signin