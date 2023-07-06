import React from 'react';
import data from '../../assets/data/activity.json'
import './Activity.css';
import Active from './Active';

const Activity = () => {
return(
  <div className="container-activity">
    <div className="activity">
      <div className="activity-header">
        Recent Activity
      </div>
      <div className="activity-contents">
        <Active/>
      </div>
    </div>
  </div>
)
 
}

export default Activity