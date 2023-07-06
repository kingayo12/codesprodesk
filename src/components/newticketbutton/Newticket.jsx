import React from 'react';
import {Link, Outlet, Navigate} from 'react-router-dom';
import './Newticket.css'
import {AiOutlinePlus} from 'react-icons/ai'


const button = [
  {
    "link": "/&=NewTicket"
  }
]


const Newticket = () => {
  return (
    button.map((button) =>{
      return(
        <div className="newticket-button">
        <div className='btns'>
        <div className='bbtn'>New Ticket</div>
        <Link to={button.link}  className="btns-cross">
        <AiOutlinePlus className='icon-primary'/>
       
        
        </Link>
        </div>
      </div>
      )
    })
   
  )
}

export default Newticket