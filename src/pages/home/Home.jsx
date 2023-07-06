import React, {useEffect, useState} from 'react';
import MasterLayout from '../../Layout/masterLayout/MasterLayout';
import LoadingAnimation from '../../components/LoadingAnimation';
import {Link} from 'react-router-dom'

const Home = () => {
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
        <div className="me">
          <h1>Welcome to the Home Page</h1>
          <p>This is the main content area of the Home page.</p>
          <Link to="/ticket">Go to Ticket Page</Link>
        </div>
      )}
     
    </MasterLayout>
  );
};

export default Home;
