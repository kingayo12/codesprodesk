import React, { useState, useEffect } from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { NavLink, useLocation } from 'react-router-dom';
import { BsChatDots } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import usr from '../../../public/img/adewumi.png'
import Profilelink from '../../components/profile/Profilelink';
import {motion, AnimatePresence} from 'framer-motion'

const Navbar = () => {
  const [dashboardTitle, setDashboardTitle] = useState('welcome');
  const [isuser, setUser] = useState(false)
  const location = useLocation();

  useEffect(() => {
    // Update the dashboard title based on the current location
    if (location.pathname === '/dashboard') {
      setDashboardTitle('Dashboard');
    } else if (location.pathname === '/ticket') {
      setDashboardTitle('Ticket');
    } else if (location.pathname === '/chat') {
      setDashboardTitle('Chat');
      }else if (location.pathname === '/newticket') {
      setDashboardTitle('NewTicket');
    }
  }, [location]);

  const handleUserClick = () =>{
    setUser((previous) => !previous)
  }

  const handleDashboardTitleUpdate = (title) => {
    setDashboardTitle(title);
  };
  
  return (
    <div className="black-transaparent h-full flex">
      <div className="nav-options">
        <div className="user-pics">
        <button
         className="profile-user"
         onClick={handleUserClick}
         >
          {/* {usr} */}
          <img src={usr} alt="" />
          <AnimatePresence>
          {isuser && (

          <motion.div 
          className="opt fixed"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ ease: "easeOut", duration: 0.5}} 
          >
          <Profilelink setDashboardTitle={handleDashboardTitleUpdate} />

          </motion.div>
          )}
           </AnimatePresence>
        </button>
        </div>
        <div className="new-ticket-button">
          <NavLink
            to="/newticket"
            className="rounded-3xl h-6 w-4/6 flex justify-center items-center bt-p-color font-bold newt"
            activeClassName="mess"
            exact
          >
            <span className="plus mr-2 flex justify-center items-center">
              <p ><FaPlus className=' text-xs'/></p> 
            </span>
           <p>New</p> 
          </NavLink>
        </div>
        <div className="nav-links flex flex-col justify-center items-center w-full gap-4">
          <NavLink
            to="/dashboard"
            className="flex p2p flex-row hover:text-sm text-xs text-slate-500 hover:text-white pl-4 h-5  text-left w-full"
            activeClassName="active"
            exact
          >
            <DashboardOutlinedIcon className="icon3w mr-2" />
            <p>Dashboard </p>
          </NavLink>
          <NavLink
            to="/ticket"
            className="flex p2p flex-row hover:text-sm text-xs text-slate-500 hover:text-white pl-4 h-5 text-left w-full"
            activeClassName="active"
            exact
          >
            <ConfirmationNumberOutlinedIcon className="icon3w mr-2" />
           <p>Ticket</p>
          </NavLink>
          <NavLink
            to="/chat"
            className="flex p2p flex-row hover:text-sm text-xs text-slate-500 hover:text-white h-5 pl-4  text-left w-full"
            activeClassName="active"
            exact
          >
            <BsChatDots className="icon3w mr-2 font-bold" />
           <p>Chat</p>
          </NavLink>
        </div>
      </div>
      <div className="title">{dashboardTitle}</div>
    </div>
  );
};

export default Navbar;
