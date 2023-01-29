
import { useState ,useEffect} from "react";
import Cookie from 'universal-cookie'
import { useNavigate } from 'react-router-dom';
function Myprofile() { 
    let cookie = new Cookie();
  let [profile,setprofile]=useState([])
  const history = useNavigate();
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/user/",{
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
      else{
        setprofile(res)}
      })
      .catch(err=>console.log(err))
  },[])
        
  return (
    <div>
        <table >
          <tr>
            <td> Name  </td>
            <td>{profile.name}</td>
          </tr>
          <tr>
            <td> Email </td>
            <td>{profile.email}</td>
          </tr>
          <tr>
            <td> username </td>
            <td>{profile.username}</td>
          </tr>
        </table>
    </div>
      
  )
}

export default Myprofile;