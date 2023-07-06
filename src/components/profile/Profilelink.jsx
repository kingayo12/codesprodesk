import React,{useEffect} from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import {motion} from 'framer-motion'

const link =[
    {
        "id": 1,
        "address": "Profile",
        "link": "/Userprofile",
        "icon": "useRadioGroup"
    },
    {
        "id": 2,
        "address": "Settings",
        "link": "./Settings"

    },
    {
        "id": 3,
        "address": "Theme",
        "link": "./Theme"

    },
    {
        "id": 4,
        "address": "Help",
        "link": "./Help"

    },
    {
        "id": 5,
        "address": "History",
        "link": "./history"

    },
    {
        "id": 6,
        "address": "About",
        "link": "./About"

    },
    {
        "id": 7,
        "address": "Logout",
        "link": "./"

    }
]






const Profilelink = ({ setDashboardTitle }) => {
    const location = useLocation();

    useEffect(() => {
        // Update the dashboard title based on the current location
        if (location.pathname === '/Userprofile') {
          setDashboardTitle('UserProfile');
        } else if (location.pathname === './Settings') {
          setDashboardTitle('Settings');
        } else if (location.pathname === './Theme') {
          setDashboardTitle('Theme');
        } else if (location.pathname === './Help') {
          setDashboardTitle('Help');
        } else if (location.pathname === './history') {
          setDashboardTitle('History');
        } else if (location.pathname === './About') {
          setDashboardTitle('About');
        } else if (location.pathname === './') {
          setDashboardTitle('Logout');
        }
      }, [location, setDashboardTitle]);

    return (
        link.map((link, index) =>{
         return(
            <motion.div
             className="navlist" 
             key={link.id}
             initial={{ opacity: 0, y: 100 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: 100 }}
                       transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 * index }} 
             >  
             <NavLink 
             to={link.link}
            //  onClick={() => handleLinkClick(link.address)}
              className="links py-2 px-1" >
                <h6>{link.address}</h6> </NavLink>
             </motion.div>
            
         )
        })
       )
}

export default Profilelink