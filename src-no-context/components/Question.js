import { Option } from './Option';

function Question({ question, answer, dispatch }) {
  return (
    <>
      <h4>{question.question}</h4>
      <Option question={question} answer={answer} dispatch={dispatch} />
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
