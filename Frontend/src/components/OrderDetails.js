import React,{useState,useEffect} from "react";
import '../CSS/UserHome.css'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';

function Order(props){
    let cookie = new Cookies();
    const history = useNavigate();
    let [product,setproduct] = useState([])

    useEffect(()=>{
        let oid = cookie.get('oid')
        fetch("http://127.0.0.1:8000/product/",{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
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
            fetch(`http://127.0.0.1:8000/order/${oid}`,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    Authorization:"Bearer "+cookie.get('token')
                }
            })
            .then(obj=>obj.json())
            .then(obj=>{
                let word = obj[0].products.split(",");
                let results = []
                for(let i=0;i<word.length;i++){
                    let spl = word[i].split(":")
                    let value = parseInt(spl[0])
                    let valCount = parseInt(spl[1])
                    let object =  res.filter((item)=>item.Pid===value);
                    object = object[0]
                    object["count"]=valCount;
                    results.push(object)
                }
                return results;
            })
            .then(res=>setproduct(res))
            .catch(err=>console.log(err))
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
             product.map((item,index)=>{
                 return (
                     <article class="card"   >
                             <img src="" alt="Sample photo"/>
                             <div class="text">
                             <h3>{item.Pid}</h3>
                             <h3>{item.name}</h3>
                             <h3>{item.price}</h3>
                             <h3>{item.count}</h3>
                             <h3>{item.desc}</h3>
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