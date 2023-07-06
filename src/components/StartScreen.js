import { useQuizContext } from '../QuizContext/QuizProvider';

//dispatch function itself can be passed onto the other child components
function StartScreen() {
  const { dispatch, numQuestions } = useQuizContext();
  return (
    <div className='start'>
      <h2>Welcome to this amazing quiz</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <button className='btn' onClick={() => dispatch({ type: 'start' })}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
