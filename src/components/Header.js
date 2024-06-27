import React from "react"
import logo from "../asset/logo.png"
import "./Header.css"
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="header--logo">
        <a href="/">
          <img
            src={logo}
            alt="logo"
          />
        </a>
      </div>
      
      <div className="header--user">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
            alt="profil"
          />
        </a>
      </div>
    </header>

    
    
  )
}

export default Header

