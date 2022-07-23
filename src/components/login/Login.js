import React from 'react'
import { useState } from 'react';
import Navbar from '../navbar/Navbar'
import './login.css';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 
import { useNavigate, Link } from 'react-router-dom';

   

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);

        setSuccessMsg('Logged in successfully, You will now be automatically redirected to Home Page.')
        
            setEmail('')
            setPassword('')
            setErrorMsg('')

            setTimeout(() => {
                setSuccessMsg('');
                navigate('/home');
            }, 3000);

        // ...
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
        alert(errorMessage);

        if(error.message === 'Firebase: Error (auth/invalid-email).')
            {
                setErrorMsg('Please Fill All Required Fields')
            } 
            if(error.message === 'Firebase: Error (auth/user-not-found).')
            {
                setErrorMsg('Email Not Found')
            }
            if(error.message === 'Firebase: Error (auth/wrong-password).')
            {
                setErrorMsg('Wrong Password')
            } 
      });
  }

  return (
    <div>
        <Navbar />
        <div className='login-container'>
        
            <form
            className='login-form'>
                <h1>Sasta Amazon</h1>
                <p>Sastay Se Bhi Sasta 😂</p>
                <p>Login Karo</p>

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

                
                <button type='submit' onClick={handleLogin}>
                Login
                </button>

                <div>
                    <span>Don't Have An Account?</span>
                    <Link to='/signup'>Sign Up</Link>
                </div>
            </form> 
        </div>
    </div>
  )
}

export default Login