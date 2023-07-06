import React from 'react';

export const FinishScreen = ({
  points,
  maxPossiblePoints,
  highScore,
  dispatch,
}) => {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <div className='result'>
        <p>
          {' '}
          You scored <strong>{points}</strong> out of {maxPossiblePoints} (
          {percentage.toFixed(2)}%)
        </p>
      </div>
      <p className='highscore'>Highscore: {highScore} points</p>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart
      </button>
    </>
  );
};
