import { useReducer, useState } from 'react';

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'dec':
      return { ...state, count: state.count - state.step };
    case 'setCount':
      return { ...state, count: action.payload };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action detected');
  }
}

function DateCounter() {
  //const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  //through the use of useReducer hook
  //setting the state of the entire application
  const [state, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    // setCount((count) => count - 1);
    //setCount((count) => count - step);
    dispatch({ type: 'dec' });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    //setCount((count) => count + step);

    //using dispatch function
    dispatch({ type: 'inc' });
  };

  const defineCount = function (e) {
    //setCount(Number(e.target.value));

    //to know which dispatch action is being called, a object with type property and payload need to be provided
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));

    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    //setCount(0);
    // setStep(1);
    dispatch({ type: 'reset' });
  };

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
