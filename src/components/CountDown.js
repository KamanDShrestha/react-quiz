import { useEffect } from 'react';
import React from 'react';
import { useQuizContext } from '../QuizContext/QuizProvider';
export const CountDown = () => {
  const { secondsRemaining, dispatch } = useQuizContext();
  const min = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;
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
