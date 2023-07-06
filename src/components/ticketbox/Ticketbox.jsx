import React,{useState} from 'react';
import './Ticketbox.css';
import data from '../../assets/data/data.json';
import moment from 'moment';
import {motion} from "framer-motion"

const Ticketbox = () => {
  
  // Format timestamp to display relative time
  const formatTime = (timestamp) => {
    const currentTime = moment();
    const postTime = moment(timestamp);
    const duration = moment.duration(currentTime.diff(postTime));
    const seconds = duration.asSeconds();

    if (seconds < 10) {
      return 'just now';
    } else if (seconds < 60) {
      return `${Math.floor(seconds)} seconds ago`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)} minutes ago`;
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(seconds / 86400)} day(s) ago`;
    }
  };


  return (
    <div >
      {
    data.map((data, index) =>{
      return(
       
        <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 * index }} 
         className="ticket-box"
          key={data.id} >
          <div className="ticket-header">{data.uniquekey}</div>
          <div className="ticket-content">
          {data.description}
          </div>
          <div className="ticket-bottom">
          {formatTime(data.timestamp)}
          </div>
        </motion.div>
  
  
        
     
      )
    })
  }
   </div>
    
  )
}

export default Ticketbox