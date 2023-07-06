import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import data from '../../assets/data/agentdata.json'
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';
const TickLink = () => {
  return (
    data.map((data, index) =>{
        return(
            <>
        <motion.div
         initial={{ opacity: 0, x: -100 }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ opacity: 0, x: 100 }}
         transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 * index }}
         className="agent-cover flex flex-col " key={data.id}>
          <div className="prof flex justify-center items-center">
            <FaUser/>
          </div>
            <div className="prf">
              <p className=' text-sm'>{data.Agentname}</p> 
             <p className=' text-xs text-slate-500'>{data.agentmail}</p> 
            </div>
        </motion.div>
       
        </>
        )
      })
      
    )
}

export default TickLink