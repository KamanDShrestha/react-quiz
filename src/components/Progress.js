import React from 'react';
import { useQuizContext } from '../QuizContext/QuizProvider';
export const Progress = () => {
  const { index, answer, points, numQuestions, maxPossiblePoints } =
    useQuizContext();

  return (
    <div className='progress'>
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        {' '}
        Question: <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points || 0}</strong>/{maxPossiblePoints} scored
      </p>
    </div>
  );
};
