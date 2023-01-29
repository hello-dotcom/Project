import React,{useState,useEffect} from "react";
import '../CSS/UserHome.css'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';

function Cart(props){
    let cookie = new Cookies();
    const history = useNavigate();
    let [cart,setcart] = useState([])
    let [total,setcost] = useState(0);
    useEffect( ()=>{
        console.log("useeffect")
        fetch("http://127.0.0.1:8000/cart/",{
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
            if(res.code=="token_not_valid"){
                alert("please do login, your session expired");
                cookie.remove('token');
                history('/login');
            }
            else{
                console.log('received')
                
                console.log(res.length,"hai world")
                    fetch(`http://127.0.0.1:8000/product/`,{
                        method:'GET',
                        headers:{
                            'Content-Type':'application/json',
                            Authorization:"Bearer "+cookie.get('token')                           
                        }
                    })
                    .then(obj=>obj.json())
                    .then( obj=>{
                        console.log(obj)
                        let listprod = []
                        let total_cost = 0;
                        for(let i=0;i<res.length;i++){
                            let object =  obj.filter((item)=>item.Pid==res[i].Pid);
                            object = object[0];
                            console.log(i,res[i].count)
                            object["count"] = res[i].count;
                            console.log(i,object.count)
                            total_cost+=res[i].count*object["price"];
                            listprod.push(object)
                        }
                        setcost(total_cost);
                        return listprod
                    })
                    .then(result=> { console.log(result)
                        setcart(result)
                    })
                    .catch(err=>console.log(err))
                
            }
        })
        .catch(err=>{console.log(err)})

        

    },[])

    const updateCart = (pid,count,increase)=>{
        if(count+increase<=0) return;
        const obj = { "Pid":pid,"count":count+increase}
        fetch("http://127.0.0.1:8000/cart/",{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                Authorization:"Bearer "+cookie.get('token')
            },
            body:JSON.stringify(obj),
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
        window.location.reload();
    }
    const deleteCart = (pid)=>{
        const obj = { "Pid":pid}
        fetch("http://127.0.0.1:8000/cart/",{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                Authorization:"Bearer "+cookie.get('token')
            },
            body:JSON.stringify(obj),
        })
        .then(res=>res.json())
        .then(res=>{
            if(res["code"]!==undefined && res.code=="token_not_valid"){
                alert("please do login, your session expired");
                cookie.remove('token');
                history('/login');
            }
            else{
                alert('product deleted')
            }
            console.log(res)
            window.location.reload();
        })
        .catch(err=>console.log(err))
        window.location.reload();
    }
    const placeOrder = ()=>{
        if(document.getElementById("address").value!=undefined &&  document.getElementById("address").value.trim()!=="" && cart.length>0)
        {
            fetch("http://127.0.0.1:8000/order/",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    Authorization:"Bearer "+cookie.get('token')
                },
                body:JSON.stringify({
                    "products":cart,
                    "address":document.getElementById("address").value
                })
            })
            .then(res=>res.json())
            .then(res=>{
                if(res["code"]!==undefined && res.code=="token_not_valid"){
                    alert("please do login, your session expired");
                    cookie.remove('token');
                    history('/login');
                }
                else{
                    alert('order placed')
                }
                console.log(res)
                
            })
            .catch(err=>console.log(err))
            history('/uHome')
        }
        else{
            alert("either cart is empty or address is empty")
        }
    }

    return cookie.get('token')!==null?(
       <div>
       <h2> Total price : {total}</h2>
        {
            cart.map((item,index)=>{
                return (
                    <article class="card"   >
                            <img src="" alt="Sample photo"/>
                            <div class="text">
                            <h3>{item.Pid}</h3>
                            <h3>{item.count}</h3>
                            <h3>{item.price}</h3>
                            <button onClick={()=>deleteCart(item.Pid)}>Delete</button>
                            <button onClick={()=>updateCart(item.Pid,item.count,-1)}>Decrease</button>
                            <button onClick={()=>updateCart(item.Pid,item.count,1)}>Increase</button>
                            </div>
                        </article>
                )
            })
        }

        <table>
            <tr>
                <th>Address</th>
                <td>
                    <input id="address" ></input>
                </td>
            </tr>
            <tr>
                <button onClick = {()=>placeOrder()}>Place an order</button>
            </tr>
        </table>
       </div>
    ):(<div>
        please login
        {history('/login')}
    </div>)
}
 export default Cart