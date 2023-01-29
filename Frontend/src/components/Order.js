import React,{useState,useEffect} from "react";
import '../CSS/UserHome.css'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';

function Order(props){
    let cookie = new Cookies();
    const history = useNavigate();
    let [order,setorder] = useState([])

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/order/",{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                Authorization:"Bearer "+cookie.get('token')
            }
        })
        .then(res=>res.json())
        .then(res=>{
            if(res["code"]!==undefined && res.code=="token_not_valid"){
                alert("please do login, your session expired");
                cookie.remove('token');
                history('/login');
            }
            console.log(res);
            setorder(res);
        })
        .catch(err=>console.log(err))
    },[])

    const updateCart = (oid)=>{
        cookie.set('oid',oid);
        history("/orderDetails")
    }

    return cookie.get('token')!==null?(
        <div>
         {
             order.map((item,index)=>{
                 return (
                     <article class="card"   >
                             <img src="" alt="Sample photo"/>
                             <div class="text">
                             <h3>{item.Oid}</h3>
                             <h3>{item.date}</h3>
                             <h3>{item.total_price}</h3>
                             <h3>{item.address}</h3>
                             <button onClick={()=>updateCart(item.Oid)}>See More Details</button>
                             </div>
                         </article>
                 )
             })
         }
        </div>
     ):(<div>
         please login
         {history('/login')}
     </div>)
}

export default Order