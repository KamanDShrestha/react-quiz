import React from 'react';
import { useQuizContext } from '../QuizContext/QuizProvider';
//answer to check which style to provide
//dispatch to change the state property of answer accroding to the button click

export const Option = () => {
  const { answer, currentQuestion, dispatch } = useQuizContext();
  const hasAnswered = answer !== null;
  return (
    <div className='options'>
      {currentQuestion.options.map((option, index) => {
        return (
          <button
            key={index}
            className={`btn btn-option ${answer === index ? 'answer' : ''} ${
              hasAnswered
                ? index === currentQuestion.correctOption
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
            onClick={() => dispatch({ type: 'newAnswered', payload: index })}
            disabled={hasAnswered}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
