import React from 'react';

//answer to check which style to provide
//dispatch to change the state property of answer accroding to the button click

export const Option = ({ question, answer, dispatch }) => {
  const hasAnswered = answer !== null;
  return (
    <div className='options'>
      {question.options.map((option, index) => {
        return (
          <button
            key={index}
            className={`btn btn-option ${answer === index ? 'answer' : ''} ${
              hasAnswered
                ? index === question.correctOption
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
