import React from 'react';
import { useQuizContext } from '../QuizContext/QuizProvider';
export const NextButton = () => {
  const { index, answer, numQuestions, dispatch } = useQuizContext();
  if (answer === null) return null;
  if (index < numQuestions - 1) {
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );
  } else {
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'nowFinished' })}
      >
        Finish
      </button>
    );
  }
};
