import React from 'react'
import { useState, useEffect } from 'react'
import Products from '../products/Products'
import Navbar from '../navbar/Navbar'
import Banner from '../banner/Banner'
import { collection, add, query, where } from 'firebase/firestore';
import { auth, db } from '../../FirebaseConfigs/firebaseConfig'
import { onAuthStateChanged } from "firebase/auth";


const Home = () => { 
  
  function GetCurrentUser() {
    const [user, setUser] = useState('')
    const usersCollectionRef = collection(db, "users");
    
    useEffect( () => {
      
      
      
      
    })
  }

  return (
    <div>
        <Navbar />
        <Banner />
        <Products />
    </div>
  )
}

export default Home