import React from 'react'
import './TicketNav.css'
import TickLink from './TickLink'




const TicketNav = () => {
  return (
    
        <div className="Ticket-nav-container">
      <TickLink/>
      <div className="navlist-types">
            <input type="search" name="" id="" className='input' placeholder='search....' />
            <select name="Filter" id="" className='input2'>
                <option value="" className='picknull'>--Filter--</option>
                <option value="" className='pick'>Date</option>
                <option value="" className='pick'>Status</option>
                <option value="" className='pick'>Year</option>
              
            </select>
        </div>
       </div>
    
  )
}

export default TicketNav