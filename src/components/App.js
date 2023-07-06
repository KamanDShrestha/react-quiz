import Header from './Header';
import Loader from './Loader';
import { useState, useEffect, useReducer } from 'react';
import Error from './Error';
import DateCounter from './DateCounter';
import Main from './Main';
import StartScreen from './StartScreen';
import Question from './Question';
import { NextButton } from './NextButton';
import { Progress } from './Progress';
import { FinishScreen } from './FinishScreen';
import { CountDown } from './CountDown';
import { useQuizContext } from '../QuizContext/QuizProvider';
//status can be : loading, error, ready, finished

function App() {
  //destructuring the state to different variables
  const { status } = useQuizContext();

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}

        {status === 'playing' && (
          <>
            <Progress />
            <Question />
            <CountDown />
            <NextButton />
          </>
        )}
        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
