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

//status can be : loading, error, ready, finished
const SECS_PER_QUESTION = 10;
const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'playing',
        secondsRemaining: SECS_PER_QUESTION * state.questions.length,
      };
    case 'newAnswered':
      //finding out which question is being answered
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
      return {
        ...state,
        answer: state.answer === 0 ? null : null,
        index: state.index + 1,
      };
    case 'nowFinished':
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case 'restart':
      return { ...initialState, questions: state.questions, status: 'ready' };
    case 'aTick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    default:
      throw new Error('Unknown action detected');
  }
}

function App() {
  //destructuring the state to different variables
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions
    .map((question) => question.points)
    .reduce((acc, points) => acc + points, 0);
  console.log(maxPossiblePoints);
  //fetching the data from the fake server created using json-server and adding a server script in package.json
  //side effects in useEffect
  //side-effects -- interacting with the data outside the components
  useEffect(() => {
    // async function getQuestions() {
    //   const data = await fetch('http://localhost:8000/questions');
    //   const questions = await data.json();
    //   console.log(questions);
    // }
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <>
      <div className='app'>
        <Header />
        <Main>
          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && (
            <StartScreen questions={numQuestions} dispatch={dispatch} />
          )}

          {status === 'playing' && (
            <>
              <Progress
                index={index}
                numQuestions={numQuestions}
                maxPossiblePoints={maxPossiblePoints}
                points={points}
                answer={answer}
              />
              <Question
                question={questions[index]}
                answer={answer}
                dispatch={dispatch}
              />
              <CountDown
                dispatch={dispatch}
                secondRemaining={secondsRemaining}
              />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                index={index}
                numQuestions={numQuestions}
              />
            </>
          )}
          {status === 'finished' && (
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highScore={highScore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
