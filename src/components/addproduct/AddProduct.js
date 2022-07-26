import React from 'react'
import Navbar from '../navbar/Navbar'

import { useState, useEffect } from 'react'


import { collection, query, where, getDocs } from 'firebase/firestore';

import { auth, db } from '../../FirebaseConfigs/firebaseConfig'

import { onAuthStateChanged } from "firebase/auth";



const AddProduct = () => {

    const [user, setUser] = useState('')
    const [useremail, setUserEmail] = useState('')
    const [userphone, setUserPhone] = useState('')

    const [producttitle, setProductTitle] = useState('')
    const [producttype, setProductType] = useState('')
    const [description, setDescription] = useState('')
    const [brad, setBrand] = useState('')
    const [customersupport, setCustomerSupport] = useState('')
    const [price, setPrice] = useState('')
    const [warranty, setWarranty] = useState('')
    const [productimage, setProductImage] = useState('') 

    const [imageError, setImageError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [uploadErr, setUploadEror] = useState('')
  

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG']
    
    const handleProductImg = (e) => {
        e.preventDefault();

        let selectedFile = e.target.files[0];

        if(selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setProductImage(selectedFile);
                setImageError('')
            }
            else{
                setProductImage(null)
                setImageError('please a valid image file type');
            }
            }
            
            else{
                setImageError('please a valid image file type');
            }
    }
    
    const handleAddProduct = (e) => {
        e.preventDefault();
        console.log('add product chal raha hai');
    }

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
        <h1>Sell Product</h1>

        {
            user && useremail === 'saqib@gmail.com'
            ?
            <div className='addprod-container'>
                <form className='addprod-form'
                onSubmit={handleAddProduct}>
                <p>Add Sell Data</p>

        
{successMsg && <div className='success-msg'>{successMsg}</div>}
{uploadErr && <div className='success-msg'>{uploadErr}</div>}

<label>Product Title</label>
<input type='text' placeholder='product title' onChange={(e) => setProductTitle(e.target.value)} />

<label>Product Type</label>
<input type='text' placeholder='product title' onChange={(e) => setProductType(e.target.value)} />

<label>Brand Name</label>
<input type='text' placeholder='product title' onChange={(e) => setBrand(e.target.value)} />

<label>Warranty</label>
<input type='text' placeholder='product title' onChange={(e) => setWarranty(e.target.value)} />

<label>Image</label>
<input type='file' onChange={handleProductImg} />

{imageError && <>
    <div className='error-msg'>{imageError}</div>
</>}


<label>Description</label>
<input type='text' placeholder='product title' onChange={(e) => setDescription(e.target.value)} />

<label>Price Without Tax</label>
<input type='text' placeholder='product title' onChange={(e) => setPrice(e.target.value)} />

<label>Customer Support</label>
<input type='text' placeholder='product title' onChange={(e) => setCustomerSupport(e.target.value)} />

<button type='submit'>Add Product</button>

                </form>
                {/* FORM END */}
            </div>
            :
            <div>
            You dont have access to add products
            </div>
        }
      
    </div>
  )
}

export default AddProduct