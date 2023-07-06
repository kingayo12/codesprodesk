import React, { useState, useEffect } from 'react';
import MasterLayout from '../../Layout/masterLayout/MasterLayout';
import LoadingAnimation from '../../components/LoadingAnimation';
import data from '../../assets/data/data.json';
import { BsChatDots } from 'react-icons/bs';
import DeleteIcon from '@mui/icons-material/Delete';
import { AnimatePresence, motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { ArchiveOutlined, ArchiveSharp, ArrowBack } from '@mui/icons-material';

const Ticket = () => {
  // useState declarations
  const [isLoading, setIsLoading] = useState(true);
  const [ticketData, setTicketData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedSortby, setSortby] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [archivedCount, setArchivedCount] = useState(0);
  // const [isPresent, safeToRemove] = usePresence();
  // const [scope, animate] = useAnimate();

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setTicketData(data);
      setIsLoading(false);
    }, 3000);
  }, []);




  // Function to handle sort-by change
  const handleSortbyChange = (event) => {
    setSortby(event.target.value); //
  };





  // Function to handle checkbox change
  const handleCheckboxChange = (itemId) => {
    const updatedItems = ticketData.map((item) => {
      if (itemId === 'all') {
        return { ...item, checked: !selectAll };
      } else if (item.id === itemId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    setTicketData(updatedItems);
    setSelectAll(updatedItems.every((item) => item.checked));
  };





  useEffect(() => {
    // Sort ticket data based on selected sort-by option
    if (selectedSortby === 'date') {
      const sortedData = [...ticketData].sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      setTicketData(sortedData);
    } else if (selectedSortby === 'priority') {
      const sortedData = [...ticketData].sort((a, b) => {
        const priorityOrder = { urgent: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      setTicketData(sortedData);
    } else if (selectedSortby === 'time') {
      const sortedData = [...ticketData].sort((a, b) => {
        return new Date(a.timestamp) - new Date(b.timestamp);
      });
      setTicketData(sortedData);
    }
  }, [selectedSortby]);






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




// Function to delete selected tickets
  const handleDeleteSelected = () => {
    const updatedItems = ticketData.filter((item) => !item.checked);
    setTicketData(updatedItems);
    setSelectAll(false);
  };





// Function to toggle chat for a ticket
  const handleChatClick = (ticketId) => {
    const updatedItems = ticketData.map((item) => {
      if (item.id === ticketId) {
        return { ...item, chatActive: !item.chatActive };
      }
      return item;
    });

    setTicketData(updatedItems);
  };




// Function to show archived tickets
  const showArchivedTickets = () => {
    setShowArchived(true);
  };




// Function to handle back button click when showing archived tickets
  const handleBackButtonClick = () => {
    setShowArchived(false);
  };





// Function to archive selected tickets
  const handleArchiveSelected = () => {
    const updatedItems = ticketData.map((item) => {
      if (selectAll || item.checked) {
        return { ...item, archived: true, checked: false };
      }
      return item;
    });

    setTicketData(updatedItems);
    setSelectAll(false);
  };





// Update archived count whenever ticketData changes
  useEffect(() =>{
    const count = ticketData.filter((ticket) => ticket.archived).length;
    setArchivedCount(count);
  }, [ticketData]);






// Function to unarchive selected tickets
  const handleUnarchiveSelected = () => {
    const updatedItems = ticketData.map((item) => {
      if (item.checked) {
        // Unarchive the selected ticket
        return { ...item, archived: false, checked: false };
      }
      return item;
    });

    setTicketData(updatedItems);
    setSelectAll(false);
  };




  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      // Add the message to the messages array
      setMessages((prevMessages) => [...prevMessages, inputText]);

      // Reset the input text
      setInputText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <MasterLayout>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="ticket flex w-full h-screen">
          <div className="ticket-main w-full">
            <div className="ticket-header w-full h-28 z-10 left-d  py-2 pl-14">
              <div className="optional-set mt-16 px-1 flex flex-row gap-8 relative">
                <label>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={() => handleCheckboxChange('all')}
                    className=" mr-3"
                  />
                  Select All
                </label>
                <div className="category flex flex-row gap-2 pb-4">
                  <label htmlFor="sortby">Sort-by:</label>
                  <select
                    value={selectedSortby}
                    onChange={handleSortbyChange}
                    className="border py-1 rounded sortby"
                  >
                    <option value="">Sortby</option>
                    <option value="date">Date</option>
                    <option value="priority">Priority</option>
                    <option value="time">Time</option>
                    {/* Add more options as needed */}
                  </select>
                </div>

            
                  <button
                  className="archivee mb-5 gap-1 px-2 rounded icon-color text-sm flex justify-center items-center"
                  onClick={showArchivedTickets}
                >
                  <ArchiveSharp className="icon-color" />
                  Archived [{archivedCount}]
                </button>
             

              
               
            
               

               {ticketData.some((ticket) => ticket.checked && !ticket.archived) ? (
                <button
                  className="archivee mb-5 gap-1 px-2 rounded icon-color text-sm flex justify-center items-center"
                  onClick={handleArchiveSelected}
                >
                    <ArchiveOutlined className="icon-color" />
                    Archive
                </button>
                ) : null}
              {ticketData.some((ticket) => ticket.checked && ticket.archived) ? (
                <button
                  className="archivee mb-5 gap-1 px-2 rounded icon-color text-sm flex justify-center items-center"
                  onClick={handleUnarchiveSelected}
                >
                    <ArchiveOutlined className="icon-color" />
                    Unarchive
                </button>
              ) : null}

              

                {selectAll || ticketData.some((ticket) => ticket.checked) ? (
                  <button
                    className="delete-button flex items-center px-2 rounded-sm text-base mb-5 text-red-400"
                    onClick={handleDeleteSelected}
                  >
                    <DeleteIcon className="icon-color" />
                    Delete
                  </button>
                ) : null}

                     {!showArchived ? (
                        <button
                        >
                        </button>
                      ) : (
                        <button
                          className="bg-gray-300 px-3 py-1 float-left absolute right-3 rounded text-gray-700"
                          onClick={handleBackButtonClick}
                        >
                          <ArrowBack/>
                        </button>
                      )}
              </div>

            </div>
            <AnimatePresence>
            <div className="ticket-body w-full px-5 py-5">
              {ticketData
                .filter((ticket) => (showArchived ? ticket.archived : !ticket.archived))
                .map((ticket, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 * index }}
                    className="ticket-fs w-full h-24 bg-white bord2 rounded-lg shadow-lg mt-5 flex flex-row gap-10 lg:px-5 md:px-2 py-2 items-center lg:justify-evenly"
                    
                  >
                    <label htmlFor={`checkbox-${ticket.id}`} className=" px-1">
                      <input
                        id={`checkbox-${ticket.id}`}
                        type={ticket.checkbox}
                        checked={ticket.checked}
                        onChange={() => handleCheckboxChange(ticket.id)}
                      />
                    </label>
                    <div className="ticket-profile flex py-2 px-2">
                      <div className="ticketer md:text-xs bg-white rounded-full flex justify-center items-center shadow-lg">
                        <FaUser className=" text-2xl icon-color" />
                      </div>
                    </div>
                    <div className="options-ticket flex flex-col lg:text-sm md:text-xs">
                      <p>{ticket.name}</p>
                      <p>{ticket.description}</p>
                      <div className="billing flex flex-row gap-2">
                        <span className="text-slate-400">Billing</span>
                        <p>{ticket.biller}</p>
                      </div>
                    </div>
                    <div className="time text-xs text-slate-400 ">{formatTime(ticket.timestamp)}</div>
                    <div className={ticket.priority}>{ticket.priority}</div>
                    <AnimatePresence>
                    {ticket.chatActive && (
                      <motion.div
                       className="chat-notification flex flex-col text-white"
                       initial={{ opacity: 0, y: 100 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: 100 }}
                       transition={{ ease: "easeOut", duration: 0.5, delay: 0.2  }} 
                       >
                        <div className="chat-hearder-mini w-full h-28 py-1  flex flex-row justify-center items-center">
                          <div className="pf-tk flex flex-col gap-1  mx-1 w-40 px-1 py-1">
                            <div className="m-profile rounded-full "></div>
                            <p className="text-xs">
                              Ticket Id: <span>{ticket.uniquekey}</span>
                            </p>
                          </div>
                          <div className="address text-xs w-full text-center">{ticket.biller}</div>
                          <button
                            className="close w-20 flex py-2 justify-center"
                            onClick={() => handleChatClick(ticket.id)}
                          >
                            <div className="closer">
                              <CloseIcon />
                            </div>
                          </button>
                        </div>
                        <div className="chat-mini-space m-1">
                        <div className="message_cover">
                        {messages.map((message, index) => (
                            <motion.div
                             key={index}
                              className="message text-black px-1"
                              initial={{ opacity: 0, x: 100 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 100 }}
                              transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 * index }}
                              >
                                
                                <p> {message}</p>
                               

                            </motion.div>
                          ))}
                           </div>  
                        </div>
                        <div className="chat-mini-input w-full h-20 flex justify-center items-center flex-row gap-2">
                          <textarea 
                           name="chat-input"
                           id="chat-input"
                           onKeyDown={handleKeyDown}
                           className="w-full h-10 ml-2 rounded py-2 text-black bord2 px-2 text-sm"
                           value={inputText}
                           onChange={handleInputChange}
                          />
                          <div className="button-spa mr-2">
                          <button className="send-button" onClick={handleSendMessage}>
                            <SendIcon className="sendbutton-icon" />
                          </button>
                          </div>
                         
                        </div>
                      </motion.div>
                      
                    )}
                    </AnimatePresence>
                    <button className="chat-button px-1 py-1" onClick={() => handleChatClick(ticket.id)}>
                      <BsChatDots className="ticket-icon" />
                    </button>
                  </motion.div>
                ))}
            </div>
            </AnimatePresence>
          </div>
          <div className="tic-filter  w-96 left-d"></div>
        </div>
      )}
    </MasterLayout>
  );
};

export default Ticket;
