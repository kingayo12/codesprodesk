import React from 'react'
import './Emailconfirm.css'
// import Logo3 from '../../assets/logo/codesprologo1.png';
import {AiFillCheckCircle } from "react-icons/ai";


const Emailconfirm = () => {
  return (
    <div className="confirm_container">
      <div className='back'>
        <div className="logo">
          {/* <img src={Logo3} alt="" /> */}
        </div>
        <div className='check-icons'>
          <AiFillCheckCircle className='inn-icons'/>
        </div>
        <div className='message'>
          <p className='inn-message'>
            Congratulation your account has been successfully registered
          </p>
        </div>
        <div className='Button'>
          <button className='btn-btn btn2'>Continue</button>
        </div>
        
        
        
        
      
    </div>
      
    
    <div className="c_illustrator"></div>
    </div>
   
  )
}

export default Emailconfirm;
