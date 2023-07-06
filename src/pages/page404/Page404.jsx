import React,{useEffect, useState} from 'react'
import MasterLayout from '../../Layout/masterLayout/MasterLayout'
import LoadingAnimation from '../../components/LoadingAnimation';



const Page404 = () => {
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
        <div className="chat">
          error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        </div>
      )}
    
    </MasterLayout>
  )
}

export default Page404
