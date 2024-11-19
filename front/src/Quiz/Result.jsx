import React from "react";
import { useNavigate } from "react-router-dom";
import './Result.scss'

const Result = ({ score }) => {
  const navigate = useNavigate();

  const restartQuiz = () => {
    navigate("/");
  };

  return (
    <div className="result">
      <h1>Quiz Completed!</h1>
      <h2>Your Final Score: {score}</h2>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default Result;