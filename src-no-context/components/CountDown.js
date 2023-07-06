import { useEffect } from 'react';
import React from 'react';

export const CountDown = ({ secondRemaining, dispatch }) => {
  const min = Math.floor(secondRemaining / 60);
  const sec = secondRemaining % 60;
  useEffect(() => {
    const thisTimer = setInterval(() => {
      dispatch({ type: 'aTick' });
    }, 1000);
    //after useEffect, clean up is necessary
    return () => clearInterval(thisTimer);
  }, [dispatch]);
  return (
    <div className='timer'>
      {min > 10 ? '' : 0}
      {min}:{sec > 10 ? '' : 0}
      {sec}
    </div>
  );
};
