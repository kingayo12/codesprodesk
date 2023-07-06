import React, { useState, useEffect } from 'react';
import MasterLayout from '../../Layout/masterLayout/MasterLayout';
import LoadingAnimation from '../../components/LoadingAnimation';
import { Save } from '@mui/icons-material';
import {motion} from 'framer-motion'
import Agentbox from '../../components/agentBox/Agentbox';
import Customerdetails from '../../components/Customerdetails';


const NewTicket = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating loading data
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleSelectedPriority = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleSelectedCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSelectedAgent = (event) => {
    setSelectedAgent(event.target.value);
  };

  
  const handleCancel = (event) => {
    event.preventDefault();
    // Add your cancel logic here
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your submit logic here
     // Reset the form
     event.target.reset();
     setSelectedPriority('');
     setSelectedCategory('');
     setSelectedAgent('');
  };

  return (
    <MasterLayout>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="dashboard flex flex-row h-full">
          <motion.div
          animate={{ opacity: [0, 1], y: [-100, 0] }}
          transition={{ ease: "easeOut", duration: 0.5}} 
           className="right-d w-full h-screen py-10 px-10 my-5">
            <h2 className='text-3xl icon-color font-bold uppercase'>New Ticket Details</h2>
            <form action="" className='pt-10 visible' onSubmit={handleSubmit}>
              <div className="carrier flex flex-row gap-5">
              <div className="firstpart">
              <label
                
               htmlFor="title" className='py-2'>
              <p className=' text-sm text-color capitalize'>title</p>
                
                <input type="text" placeholder='title' className='nw-t-input' />
              </label>
              <div className="nt_priprity-category flex flex-col gap-1">
                <label htmlFor="title" className='py-2'>
                <p className=' text-sm text-color capitalize'>priority</p>

                  <select
                    name="priority"
                    id="priority"
                    className='nt-insel'
                    value={selectedPriority}
                    onChange={handleSelectedPriority}
                  >
                    <option value="" className="text-slate-400">select priority</option>
                    <option value="urgent">urgent</option>
                    <option value="medium">medium</option>
                    <option value="low">Low</option>
                  </select>
                </label>
                <label htmlFor="title" className='py-2'>
                <p className=' text-sm text-color capitalize'>Category</p>
                  
                  <select
                    name="category"
                    id="category"
                    className='nt-insel'
                    value={selectedCategory}
                    onChange={handleSelectedCategory}
                  >
                    <option value="" className="text-slate-400">select category</option>
                    <option value="urgent">ujesbest</option>
                    <option value="medium">jdvbnjvj</option>
                    <option value="low">hdbbds</option>
                  </select>
                </label>
              
              
                {/* select agent & due date  */}
              <label htmlFor="title" className='py-2'>
              <p className=' text-sm text-color capitalize'>Agent</p>

                  <select
                    name="Agent"
                    id="agent"
                    className='nt-insel'
                    value={selectedAgent}
                    onChange={handleSelectedAgent}
                  >
                    <option value="" className="text-slate-400">select Agent</option>
                    
                  </select>
                </label>
                <label htmlFor="title" className='py-2'>
                  <p className=' text-sm text-color capitalize'>due-date</p>
                 <input type="date" name="" id="" placeholder='due date' className='nt-insel'/>
                </label>
              </div>
              <div className="description">
             
              </div>
              </div>
              <div className="secondpart">
                <label htmlFor="attachment">
                  attachment
                  <input type="file" name="" id="" className='nt-insel ater' />
                </label>
                <label htmlFor="title" className='py-2 flex flex-col'>
                Description
                 <textarea name="" id="" cols="30" rows="10" className='nt-insel ter'></textarea>
                </label>
              </div>
              </div>
              <div className="cancel-save">
              <button type="button" onClick={handleCancel} className='button1'>cancel</button>
              <button type="submit" className='button2'> <Save/> <p>Submit</p></button>
              </div>
            </form>
          </motion.div>
          <div className="left-d w-96 px-5 py-5 bg-white">
            <Agentbox/>
          </div>
          <div className="left-d w-96 px-5 py-5 bg-linear2">
            <Customerdetails/>
          </div>
        </div>
      )}
    </MasterLayout>
  );
};

export default NewTicket;
