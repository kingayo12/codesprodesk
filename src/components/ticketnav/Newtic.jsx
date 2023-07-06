import React from 'react';
import NewticketLink from './NewticketLink';

const Newtic = () => {
  return (
    <div className="Ticket-nav-container">
    <NewticketLink/>
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

export default Newtic