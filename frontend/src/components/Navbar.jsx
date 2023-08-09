import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { LogOut, reset } from "../features/authSlice"


export default function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logOut = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/")
    }

    return <>
        <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <NavLink className="navbar-item" to={"/dashboard"}>
                <img 
                    src="https://bulma.io/images/bulma-logo.png"
                    width="112" 
                    height="28"
                    alt="logo"
                />
            </NavLink>
        
            <a href='!#' role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
        
          <div id="navbarBasicExample" className="navbar-menu">        
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <button className="button is-light" onClick={logOut}>
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
    </>
}