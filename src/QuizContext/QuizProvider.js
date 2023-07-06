import { createContext } from 'react';
import { useContext } from 'react';
import { useReducer, useEffect } from 'react';
const QuizContext = createContext();

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

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions
    .map((question) => question.points)
    .reduce((acc, points) => acc + points, 0);
  console.log(maxPossiblePoints);
  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);
  const currentQuestion = questions[index];
  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        dispatch,
        maxPossiblePoints,
        currentQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('Outside the scope of the context');
  return context;
}

export { QuizProvider, useQuizContext };
