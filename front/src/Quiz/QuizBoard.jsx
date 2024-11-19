import  { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Result from './Result';
import Quiz from './quiz';
import "./quiz.scss";
import { FaCheck } from "react-icons/fa6";

const QuizBoard = () => {
  const [score, setScore] = useState(0);
  const [quizStatus, setQuizStatus] = useState("welcomeQuiz");
  const updateScore = (points) => {
    setQuizStatus("quizResult");
    setScore(score + points);
  };
  const QuizLocation = (loca) => {
    setScore(0);
    setQuizStatus(loca);
  }

  return (
    <div className="quiz_board">
      {quizStatus=="welcomeQuiz" &&
        <div className="quiz_welcome">
          <h1 className="quiz-title">Welcome to Quiz</h1>
          <div className="difficulty-section">
            <h2>Select Difficulty:</h2>
            <div className="difficulty-options">
              <label>
                <input type="checkbox" value="easy" />
                <FaCheck />
                <p>Easy</p>
              </label>
              <label>
                <input type="checkbox" value="medium" />
                <FaCheck />
                <p>Medium</p>
              </label>
              <label>
                <input type="checkbox" value="hard" />
                <FaCheck />
                <p>Hard</p>
              </label>
            </div>
          </div>
          <button onClick={e=>setQuizStatus("startQuiz")} className="start-button">Start Quiz</button>
        </div>
      }
      {quizStatus=="startQuiz" && 
        <Quiz updateScore={updateScore} quizResult={QuizLocation}/>
      }
      {quizStatus=="quizResult" && <Result restartQuiz={QuizLocation} score={score} />}
    </div>
  );
};

export default QuizBoard;