import React from 'react'
import Navbar from '../navbar/Navbar'
import './userprofile.css'

import { useState, useEffect } from 'react'


import { collection, query, where, getDocs } from 'firebase/firestore';

import { auth, db } from '../../FirebaseConfigs/firebaseConfig'

import { onAuthStateChanged } from "firebase/auth";

const UserProfile = () => {

  const [user, setUser] = useState('')
  const [useremail, setUserEmail] = useState('')
  const [userphone, setUserPhone] = useState('')

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
            setUserEmail(userDetails.email)
            setUserPhone(userDetails.phonenumber)
          });
        }

        getUser();
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

  }, [])

  return (
    <div>
        <Navbar />
        <h1>User Profile</h1>
        <div className='userprofile-outercontainer'>
          {user ? 
          <div className='user-profile'>
          <p>Your Account Details</p>

          <div className='data-row'>
          <span>Your Name</span>
          <span><h4>{user}</h4></span>
          </div> 

          <div className='data-row'>
          <span>Your Email</span>
          <span><h4> {useremail} </h4></span>
          </div> 

          <div className='data-row'>
          <span>Phone No.</span>
          <span><h4> {userphone} </h4></span>
          </div> 

          </div> 
          : 
          <div>
            <h3>you are not logged in</h3>
          </div>}
        </div>
    </div>
  )
}

export default UserProfile