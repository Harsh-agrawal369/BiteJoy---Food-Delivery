import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

const Navbar = ({showLogin, setShowLogin}) => {

  const [menu, setMenu] = useState("home");


  return (
    <div className='navbar'>
      <img src={assets.biteJoy_logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active":""}>Home</Link>
        <a  href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu"? "active" : ""}>Menu</a>
        {/* <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app"? "active" : ""}>Mobile-app</li> */}
        <a  href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us"? "active" : ""}>Contact Us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" className="search" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon}></img>
          <div className="dot"></div>
        </div>
        <button onClick={() => {setShowLogin(true)}}>Sign-In</button>
      </div>
    </div>
  )
}

export default Navbar
