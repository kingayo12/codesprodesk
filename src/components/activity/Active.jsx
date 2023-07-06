import React from 'react'
import data from '../../assets/data/activity.json'
import './Activity.css';
import PRF from '../../assets/img/profile/prf2.jpg';

const Active = () => {
    return (
        data.map((data) =>{
          return(
                <div className="activity-content"  key={data.id}>
                  <div className="active-profile">
                    <img src={PRF} alt="" />
                  </div>
                  <div className="active-profile-content">
                    <h6>{data.Assign} <span> {data.Assigned}.</span> 
                    </h6>
                    <small className='small'>{data.time}</small>
                  </div>
                </div>
          )
        })
       
      )
}

export default Active