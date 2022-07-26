import React from 'react'
import { useState, useEffect } from 'react';
import './navbar.css';

import { Link, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../FirebaseConfigs/firebaseConfig'
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";


import cartlogo from '../../assets/cart.png'
import profilelogo from '../../assets/profile.png'
import logo from '../../assets/amazonlogo.png'


const Navbar = () => {
  
  
  const navigate = useNavigate();
  const [user, setUser] = useState('')

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // console.log(uid);

        const getUser = async () => {

          const q = query(collection(db, "users"), where("uid", "==", uid));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const userDetails = doc.data()
            console.log(doc.id, " ==> ", userDetails.username);
            setUser(userDetails.username)
          });
        }

        getUser();
        // ...
      } else {
        // User is signed out
        // ...
        console.log('User is signed out')
      }
    });



  }, [])


  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.

      navigate('/login')

    }).catch((error) => {
      // An error happened.
    });

  }

  return (
    <div className='navbar'>
      <div className='LeftContainer'>
        <img src={logo} alt='logo' />
      </div>

      <div className='RightContainer'>
        {!user && 
        <nav>
        <Link to='/'><button>Home</button></Link>
        <Link to='/signup'><button>Register</button></Link>
        <Link to='/login'><button>Login</button></Link>

        {/* <div className='cart-btn'>
                <img src={cartlogo} alt='cart image' />
                <span className='cart-icon-css'>0</span>
        </div>  */}

        <Link to='/userprofile'>
            <img src={profilelogo} alt='logo' className='profile-icon' />
        </Link>

        </nav>
        }

        {user &&
        <nav>
        <Link to='/'><button>Home</button></Link>
        <Link to='/sellproduct'><button>Sell</button></Link>
        <div className='cart-btn'>
                <img src={cartlogo} alt='cart image' />
                <span className='cart-icon-css'>0</span>
        </div> 
        <Link to='/userprofile'>
            <img src={profilelogo} alt='logo' className='profile-icon' />
        </Link>
        
        <button className='logout-btn' onClick={handleLogout}>Log Out</button>
        </nav>

        }
      </div>
    </div>

    // {/* <nav>
    //     <Link to='/'><button>Home</button></Link>
    //     <Link to='/signup'><button>Register</button></Link>
    //     <Link to='/login'><button>Login</button></Link>

    //    <Link to='/cart'>
    //         <div className='cart-btn'>
    //             <img src={cartlogo} alt='cart image' />
    //             <span className='cart-icon-css'>0</span>
    //         </div> 
    //    </Link>

    //     <Link to='userprofile'>
    //         <img src={profilelogo} alt='logo' className='profile-icon' />
    //     </Link>
    // </nav> */}

  )
}

export default Navbar

// yahan bhi wohi same kaam karaya jo Home.js wali file mai karaya tha.
// bs idhar DIV mai conidtion laga din k agar user login hai tou ye wali NAV dikh jaye warna dosri wali NAV nazar ajaye.
// signOut ka function firebase se utha k daala hai.