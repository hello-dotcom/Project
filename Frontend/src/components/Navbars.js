import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie'
function Navbars()
{
  let cookie = new Cookies();
    return(
        <nav className="navbar navbar-expand-lg bg-body-primary">
        <div className="container-fluid">
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {cookie.get('token')!=null?
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to={'/uHome'}>UserHome</Link>
              </li>
              <li className="nav-item txt-bd">
                <Link className="nav-link" to={'/cart'}>Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/order'}>Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to={'/profile'}>Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to={'/logout'} refresh="true">Logout</Link>
              </li>
            </ul>
          </div>:
          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to={'/'}>Home</Link>
            </li>
            <li className="nav-item txt-bd">
              <Link className="nav-link" to={'/login'}>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/signin'}>Signin</Link>
            </li>
          </ul>
        </div>}
        </div>
      </nav>
    )
}
export default Navbars