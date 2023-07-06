import React from 'react';
import {Link, Outlet} from 'react-router-dom';


const data = [
    {
      "id": 1,
      "link": "NewTicket",
      "address":"#",
      "classname": "link"
    }
  
  ]

const NewticketLink = () => {
  return (
    data.map((data) =>{
        return(
            <>
        <div className="navlist" key={data.id}>
            <Link to={data.address} className=>{data.link}</Link>
            
        </div>
       
        </>
        )
      })
  )
}

export default NewticketLink