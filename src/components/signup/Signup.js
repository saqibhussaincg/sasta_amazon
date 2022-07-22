import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar'
import './signup.css';


import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../FirebaseConfigs/firebaseConfig';
import { db } from '../../FirebaseConfigs/firebaseConfig';

// But sometimes there isn't a meaningful ID for the document, and it's more convenient to let Cloud Firestore auto-generate an ID for you. You can do this by calling add():
import { collection, addDoc } from "firebase/firestore"; 



const Signup = () => {

    const [username, setUserName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');


    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const initialCartValue = 0;
        console.log(user);
        
        addDoc(collection(db, "users"), {
            username : username,
            phonenumber : phonenumber,
            email : email,
            password : password,
            address : address,
            cart : initialCartValue,
            uid : user.uid,
        })
        .then(() => {
            setSuccessMsg('New User added successfully, You will now be automatically redirected to login page.')
            setUserName('')
            setPhoneNumber('')
            setEmail('')
            setPassword('')
            setAddress('')
            setErrorMsg('')

            setTimeout(() => {
                setSuccessMsg('');
                navigate('/login');
            }, 3000);
        })
        .catch((error) => {setErrorMsg(error.message)});

        })
        // .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // alert(errorCode);
        // alert(errorMessage);
        // });

        .catch((error) => {
            if(error.message === 'Firebase: Error (auth/invalid-email).')
            {
                setErrorMsg('Please Fill All Required Fields')
            } 
            if(error.message === 'Firebase: Error (auth/email-already-in-use).')
            {
                setErrorMsg('User Already Exists')
            } 
        })
    }

  return (
    <div>
        <Navbar />
        <div className='signup-container'>

            <form
            onSubmit={handleSubmit}
            className='signup-form'>
                <h1>Sasta Amazon</h1>
                <p>Sastay Se Bhi Sasta 😂</p>
                <p>Create Account</p>

                {successMsg && 
                    <>
                        <div className='success-msg'>
                            {successMsg}
                        </div>
                    </>
                }

                {errorMsg && 
                    <>
                        <div className='error-msg'>
                            {errorMsg}
                        </div>
                    </>
                }



                <label>Your Name</label>
                <input 
                onChange={(e) => setUserName(e.target.value)}
                type='text' placeholder='First & Last Name'
                />

                <label>Mobile Number</label>
                <input 
                onChange={(e) => setPhoneNumber(e.target.value)}
                type='tel' placeholder='Enter Your Phone Number'
                />

                <label>Email</label>
                <input 
                onChange={(e) => setEmail(e.target.value)}
                type='email' placeholder='Enter Your Email'
                />

                <label>Password</label>
                <input 
                onChange={(e) => setPassword(e.target.value)}
                type='password' placeholder='Enter Your Password'
                />

                <label>Address</label>
                <textarea
                onChange={(e) => setAddress(e.target.value)}
                type='text' placeholder='Enter Your Address'>
                </textarea>
                
                <button type='submit'>Sign Up</button>

                <div>
                    <span>Already Have An Account?</span>
                    <Link to='/login'>Sign In</Link>
                </div>
            </form> 
        </div>
    </div>
  )
}

export default Signup


// Jo firebase ka data the firebase config file mai osay ek variable mai store kara kar export kara or idhar import kara.

// addDoc Collection firebase se import kara or use kara.

// ek form banaya os mai input fields banai, un fields mai onChange ka function banaya or setState wali value use karin.

// form k andar sumbit ka Handle Function banaya or osay use karte hoay os function k andar CreateUser karaya jo firebase se copy kara, or os k baad    data store karaya firebase k collection mai addDoc firebase k builtin method ki madad se.

// setTimeOut ka function bhi use kara k sub kuch hone k baad Navigate kara do Login k page per.

// error or success ki useState bhi use kara.

// // auth firebaseConfig.js se connect karne k liye use hota hai.