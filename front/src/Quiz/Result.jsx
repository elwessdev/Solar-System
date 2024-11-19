const Result = ({ score, restartQuiz }) => {
  return (
    <div className="result">
      <h1>Quiz Completed!</h1>
      <h2>Your Final Score: {score}</h2>
      <button onClick={e=>restartQuiz("welcomeQuiz")}>Restart Quiz</button>
    </div>
  );
};
export default Result;