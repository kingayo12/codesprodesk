import React, { useEffect, useRef } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { useAnimate, usePresence, motion } from 'framer-motion';

const Box = () => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  const boxRefs = useRef([]);

  useEffect(() => {
    if (isPresent) {
      boxRefs.current.forEach((boxRef, index) => {
        const enterAnimation = async () => {
          await animate(
            boxRef,
            { opacity: [0, 1], scale: [1.2, 1] },
            { duration:1, delay: 0.2 * index }
          );
        };
       enterAnimation()
      });
    } else {
      const exitAnimation = async () => {
        await animate(
          boxRefs.current,
          { opacity: [1, 0] },
          { duration: 0.5, delay: 0.2}
        );
        safeToRemove();
      };
      exitAnimation();
    }
  }, [isPresent, safeToRemove, animate]);

  return (
    <div className="box-assigned flex flex-row gap-14 px-20 py-5 overflow-x-auto">
      <div className="unassigned dashbg w-80 min-w-max px-2 h-32 bg-white rounded-3xl shadow-lg border" ref={(ref) => boxRefs.current[0] = ref} data-index={0}>
        <div className="details flex justify-center items-center w-full h-full">
          <div className="unassigned-num text-5xl mr-3">2</div>
          <div className="unassined-context flex gap-2 flex-col capitalize text-sm">
            <div className="unassined-title text-black font-semibold">unassigned</div>
            <div className="actions flex flex-row justify-center items-center">
              <div className="text-green-600 mr-1 text-sm"><FaArrowDown /></div>
              <div className="down"></div>
              <div className="unassined-content"><span className='text-green-600 font-semibold'>2</span> vs previous 11 days</div>
            </div>
          </div>
        </div>
      </div>
      <div className="unresolved dashbg w-80 h-32 min-w-max px-2 bg-white rounded-3xl shadow-lg border" ref={(ref) => boxRefs.current[1] = ref} data-index={1}>
        <div className="details flex justify-center items-center w-full h-full">
          <div className="unassigned-num text-5xl mr-3">33</div>
          <div className="unassined-context flex gap-2 flex-col capitalize text-sm">
            <div className="unassined-title text-black font-semibold">unresolved</div>
            <div className="actions flex flex-row justify-center items-center">
              <div className="text-red-600 mr-1 text-sm"><FaArrowUp /></div>
              <div className="down"></div>
              <div className="unassined-content"><span className='text-red-600 font-semibold'>32</span> vs previous 11 days</div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashbg w-80 h-32 min-w-max px-2 bg-white rounded-3xl shadow-lg border" ref={(ref) => boxRefs.current[2] = ref} data-index={2}>
        <div className="details flex justify-center items-center w-full h-full">
          <div className="unassigned-num text-5xl mr-3">10</div>
          <div className="unassined-context flex gap-2 flex-col capitalize text-sm">
            <div className="unassined-title text-black font-semibold">Urgent</div>
            <div className="actions flex flex-row justify-center items-center">
              <div className="text-red-600 mr-1 text-sm"><FaArrowUp /></div>
              <div className="down"></div>
              <div className="unassined-content"><span className='text-red-600 font-semibold'>8</span> vs previous 11 days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
