import React,{useState,useEffect} from "react";
import '../CSS/UserHome.css'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';

function Login(props){
    let cookie = new Cookies();
    const history = useNavigate();
    let [product,setproduct]=useState([])
    if(cookie.get('home')==='true'){
        cookie.set('home',false);
        console.log('home')
        window.location.reload();
    }
    useEffect(()=>{
        console.log("useeffect")
        fetch("http://127.0.0.1:8000/product/",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+cookie.get('token'),
        }
        })
        .then(res=>res.json())
        .then(res=>{
            if(res["code"]!==undefined && res.code=="token_not_valid"){
                alert("please do login, your session expired");
                cookie.remove('token');
                history('/login');
            }
            console.log(res)
            setproduct(res)})
        .catch(err=>console.log(err))
    },[])

    const productDetails = (pid)=>{
        const obj = { "Pid":pid,"count":1}
        fetch("http://127.0.0.1:8000/cart/",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization:"Bearer "+cookie.get('token')
            },
            body:JSON.stringify(obj)
        })
        .then(res=>res.json())
        .then(res=>{
            if(res["code"]!==undefined && res.code=="token_not_valid"){
                alert("please do login, your session expired");
                cookie.remove('token');
                history('/login');
            }
            else{
                alert("cart updated")
            }
            console.log(res)
        })
        .catch(err=>console.log(err))
    }
    return cookie.get('token')!==null?(
       <div>
        hello world
       
        {
            product.map((prod,index) => {
                return  <article class="card"   >
                            <img src="" alt="Sample photo"/>
                            <div class="text">
                            <h3>{prod.Pid}</h3>
                            <h3>{prod.name}</h3>
                            <p>{prod.desc}</p>
                            <p>{prod.price}</p>
                            {prod.status===true?<p>In Stock</p>:<p>Out of Stock</p>}
                            <button onClick={()=>productDetails(prod.Pid)}>Add To Cart</button>
                            </div>
                        </article>;
                })
        }
        <button onClick={()=>window.location.reload(true)}>reload</button>
       </div>
    ):(<div>
        please login
        {history('/login')}
    </div>)
}
 export default Login