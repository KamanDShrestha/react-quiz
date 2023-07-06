import { Option } from './Option';
import { useQuizContext } from '../QuizContext/QuizProvider';
function Question() {
  const { currentQuestion } = useQuizContext();
  return (
    <>
      <h4>{currentQuestion.question}</h4>
      <Option />
      {/* {answer && (
        <button
          className='btn btn-ui'
          onClick={() => dispatch({ type: 'nextQuestion' })}
        >
          Next
        </button>
      )} */}
    </>
  );
}

export default Question;
