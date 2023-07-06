import React, { useEffect, useState } from 'react';
import MasterLayout from '../../Layout/masterLayout/MasterLayout';
import LoadingAnimation from '../../components/LoadingAnimation';
import { EditAttributesOutlined, MenuOpenOutlined, ModeEditOutlined, Search } from '@mui/icons-material';
import data from '../../assets/data/data.json';
import { FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ticketData, setTicketData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isShowin, setisShowing] = useState('');
  const [activeTicket, setActiveTicket] = useState(null);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setTicketData(data);
      setIsLoading(false);
    }, 3000);
  }, []);

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

  // Filter tickets based on search text
  const filteredTickets = ticketData.filter(
    (ticket) =>
      ticket.name.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchText.toLowerCase())
  );

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

  const handleTicketClick = (ticket) => {
    setActiveTicket(ticket); // Set the clicked ticket as active
    setisShowing(true); // Show the chat interface

     // Filter messages based on the ticket ID
  const filteredMessages = messages.filter((message) => message.ticketId === ticket.id);

  setMessages(filteredMessages); // Update the messages state with filtered messages
  };

  

  return (
    <MasterLayout>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="ticket flex w-full h-screen">
          <div className="tic-filter pt-2 w-96 left-d">
            <div className="title_c px-2">
              <div className="head text-lg font-bold ml-6 text-color2">chat</div>
              <div className="new flex items-center justify-center rounded-full hover:bg-slate-400 w-10 h-10 mr-3">
                <ModeEditOutlined className="icon-color sert bg-transparent" />
              </div>
            </div>
            <div className="search relative mx-5">
              <input
                type="search"
                name=""
                placeholder="search...."
                id=""
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Search className="icon-color absolute right-1 sert" />
            </div>
            <div className="ticket-ch mx-2 mt-2">
              {filteredTickets.map((ticket, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ ease: 'easeOut', duration: 0.5, delay: 0.2 * index }}
                  onClick={() => handleTicketClick(ticket)}
                  className="ticket-fs1 w-full  bg-white rounded-lg flex flex-row gap-3 lg:px-5 md:px-2 py-2 items-center relative"
                >
                  <div className="ticket-profile flex">
                    <div className="ticketer md:text-xs bg-white rounded-full flex justify-center items-center">
                      <FaUser className=" text-2xl icon-color" />
                    </div>
                  </div>
                  <div className="options-ticket flex flex-col lg:text-sm md:text-xs">
                    <p className="text-xs font-bold text-left">{ticket.name}</p>
                    <p className="text-xs text-left">{ticket.description}</p>
                  </div>
                  <div className="time t-small text-slate-400 text-left absolute right-5 top-4">
                    {formatTime(ticket.timestamp)}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
          <div className="ticket-main w-full relative">
          {activeTicket ? (
              // Chat interface when an active ticket is clicked
              <>
                <div className="ticket-header2 w-full h-16 z-10 left-d ">
                  <div className="l_side flex items-center flex-row gap-2 ml-2">
                    {/* <div className="client"> */}
                    <div className="ticketer md:text-xs bg-white rounded-full flex justify-center items-center">
                      <FaUser className=" text-2xl icon-color" />
                    </div>
                  {/* </div> */}
                  <div className="optional-set px-1 flex flex-col  relative"> <p className=' text-sm font-bold capitalize'>{activeTicket.name} </p> <p className=' text-xs text-slate-500'> {activeTicket.description}... </p> </div>
                  </div>
                  <button className=' mr-2 w-10 h-10 hover:bg-slate-300 rounded-full'>
                    <MenuOpenOutlined className='icon-color'/>
                  </button>
                </div>
                <div className="msg">
            <div className="ticket-body message_cover w-full px-5 py-5">
             {activeTicket &&
             messages.map((message, index) => (
                <motion.div
                  key={index}
                   className="message text-black px-1"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 * index }}
                  
                   >
                    {/* <p>{activeTicket}</p> */}
                    <p>{message}</p>
                               

                </motion.div>
                ))}
               </div>
              </div>

              <div className=" absolute bottom-20 w-full h-16 z-10 left-d-c pt-4">
                              <div className="optional-set  px-1 flex flex-row gap-8 relative">
                          <textarea 
                           name="chat-input"
                           id="chat-input"
                           onKeyDown={handleKeyDown}
                           className="w-full h-10 ml-2 rounded py-2 text-black bord5 px-2 text-sm"
                           value={inputText}
                           onChange={handleInputChange}
                           placeholder='message....'
                          />
                          <div className="button-spa mr-2">
                          <button className="send-button" onClick={handleSendMessage}>
                            <SendIcon className="sendbutton-icon" />
                          </button>
                          </div>
           
              </div>
            </div>
              </>
              
          ): (
            <div className="w-full h-screen flex items-center justify-center">
            <div className="me text-2xl text-color2 font-bold uppercase">Welcome to helpdesk chat</div>
            </div>
          )}

          
                   
          </div>
        </div>
      )}
    </MasterLayout>
  );
};

export default Chat;
