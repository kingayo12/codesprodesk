import React, { useEffect, useState } from 'react';
import MasterLayout from '../../Layout/masterLayout/MasterLayout';
import LoadingAnimation from '../../components/LoadingAnimation';
// import { EditAttributesOutlined, MenuOpenOutlined, ModeEditOutlined, Search } from '@mui/icons-material';
// import data from '../../assets/data/data.json';
// import { FaUser } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import moment from 'moment';
// import SendIcon from '@mui/icons-material/Send';

const Userprofile = () => {
  const [isLoading, setIsLoading] = useState(true);
 

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);





  return (
    <MasterLayout>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="ticket flex w-full h-screen">
         
          <div className="ticket-main w-full relative">
         
                   meeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
          </div>
        </div>
      )}
    </MasterLayout>
  );
};

export default Userprofile;
