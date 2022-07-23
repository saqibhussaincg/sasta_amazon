import React from 'react'
import Navbar from '../navbar/Navbar'

const UserProfile = () => {
  return (
    <div>
        <Navbar />
        <div className='userprofile-container'>
          <div className='user-profile'>
            <p>Your Account Details</p>

            <div className='data-row'>
              <span>Your Name</span>
              <span></span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UserProfile