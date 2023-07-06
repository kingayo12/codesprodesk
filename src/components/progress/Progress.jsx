import React, {useEffect, useState} from 'react'

const Progress = () => {
    const [percentage1, setPercentage1] = useState(0);
    const [percentage2, setPercentage2] = useState(0);

    useEffect(() => {
        const interval1 = setInterval(() => {
          if (percentage1 < 65) {
            setPercentage1(percentage1 + 1);
          } else {
            clearInterval(interval1);
          }
        }, 12);
    
        const interval2 = setInterval(() => {
          if (percentage2 < 80) {
            setPercentage2(percentage2 + 1);
          } else {
            clearInterval(interval2);
          }
        }, 12);
    
        return () => {
          clearInterval(interval1);
          clearInterval(interval2);
        };
      }, [percentage1, percentage2]);
  return (
    <div className="strokes flex flex-row justify-center items-center gap-2 w-full h-64  ">
                <div className="stroke1  rounded-full  relative">
                  <div className="outer rounded-full">
                    <div className="inner  rounded-full">
                      <div className="number">
                      {percentage1}%
                      </div>

                    </div>
                  </div>

                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px" className='optsvg'>
                    <defs>
                        <linearGradient id="GradientColor">
                          <stop offset="0%" stop-color="#14004F" />
                          <stop offset="100%" stop-color="#186679"  />
                        </linearGradient>
                    </defs>
                    <circle cx="80" cy="80" r="70" stroke-linecap="round" />
                  </svg>
                  
                </div>
                <div className="st-content w-36 mr-4 flex flex-col gap-2">
                  <div className="st-header text-sm font-semibold">
                    First reply resolved
                  </div>
                  <div className="st-details text-xs">
                    13 ticket(s) where resolved with the first reply
                  </div>
                </div>
                <div className="stroke2  rounded-full relative">
                <div className="outer rounded-full">
                    <div className="inner  rounded-full">
                      <div className="number">
                      {percentage2}%
                      </div>

                    </div>
                  </div>

                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px" className='optsvg'>
                    <defs>
                        <linearGradient id="GradientColor">
                          <stop offset="0%" stop-color="#14004F" />
                          <stop offset="100%" stop-color="#186679"  />
                        </linearGradient>
                    </defs>
                    <circle cx="80" cy="80" r="70" stroke-linecap="round" />
                  </svg>
                </div>
                <div className="st-content w-36 mr-4 flex flex-col gap-2">
                  <div className="st-header text-sm font-semibold">
                    New vs. Returning
                  </div>
                  <div className="st-details text-xs">
                    1 new customer(s) <br/>
                    17 returning customers
                  </div>
                </div>
              </div>
  )
}

export default Progress
