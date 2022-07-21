import React from 'react'
import './navbar.css';

import { Link } from "react-router-dom";

import cartlogo from '../../assets/cart.png'
import profilelogo from '../../assets/profile.png'


const Navbar = () => {
  return (
    <nav>
        <Link to='/'><button>Home</button></Link>
        <Link to='/signup'><button>Register</button></Link>
        <Link to='/login'><button>Login</button></Link>

       <Link to='/cart'>
            <div className='cart-btn'>
                <img src={cartlogo} alt='cart image' />
                <span className='cart-icon-css'>0</span>
            </div> 
       </Link>

        <Link to='userprofile'>
            <img src={profilelogo} alt='logo' className='profile-icon' />
        </Link>
    </nav>
  )
}

export default Navbar