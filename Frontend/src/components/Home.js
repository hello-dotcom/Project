import React from "react";
import Caurosal from "./Caurosal";
import Homecard from "./Homecard";
import './Homecard.css'
import { useState ,useEffect} from "react";
import Cookies from "universal-cookie";
function Home(){
    let [todo,setvalue]=useState([])
    let cookie = new Cookies()
    if(cookie.get('home')==='true'){
        cookie.set('home',false);
        console.log('home')
        window.location.reload();
    }
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/product/",{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then(todosData=>{setvalue(todosData)
        console.log(todosData)})
        .catch(err=>console.log("err is",err))
    },[])

    return(
        <div className="bg-white"> 
            <Caurosal></Caurosal>
            <div className="homecard">
                <div>
                    <Homecard></Homecard>
                </div>
                <div>
                    <Homecard></Homecard>
                </div>
                <div>
                    <Homecard></Homecard>
                </div>
                <div>
                    <Homecard></Homecard>
                </div>
                
            </div>
        </div>
    )
}
 export default Home