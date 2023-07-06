import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import 'animate.css';
import Emailconfirm from './pages/emailConfirm/Emailconfirm';
import Home from './pages/home/Home';
import Ticket from './pages/ticket/Ticket';
import Dashboard from './pages/Dashboard/Dashboard';
import Chat from './pages/chat/Chat';
import Newticket from './pages/newticket/Newticket';
import Page404 from './pages/page404/Page404';
import Userprofile from './pages/userprofile/Userprofile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-mail" element={<Emailconfirm />} />
        <Route path="/helpdesk" element={<Home />}/>
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/newticket" element={<Newticket/>} />
        <Route path="/userprofile" element={<Userprofile/>} />

        <Route path="*" element={<Page404/>} />

      </Routes>
    </Router>
  );
};

export default App;
