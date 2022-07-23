import React from 'react'
import { useState, useEffect } from 'react'
import Products from '../products/Products'
import Navbar from '../navbar/Navbar'
import Banner from '../banner/Banner'
import { collection, add, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../FirebaseConfigs/firebaseConfig'
import { onAuthStateChanged } from "firebase/auth";


const Home = () => {

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
      }
    });



  }, [])

  return (
    <div>
      <Navbar />
      <Banner />
      <Products />
      <p>{user ? user : "No User"}</p>
    </div>
  )
}

export default Home

// onAuthStateChanged lagaya check karne k liye k kon sa user login hai os ki (UID) se batao.
// onAuthStateChanged k IF k andar conidtion batai k ye ye data chaiye yahan se.
// querySnapshot k variable mai sub ko daala or os k andar bataya jo kuch task perform karwana hai
// doc() ek function hai function k andar k andar se object nahi khol sakte tou osay kholne k liye doc() ko variable k andar daal dia or phr os variable k zariye wo value nikal lin jis ki zarurat thi.