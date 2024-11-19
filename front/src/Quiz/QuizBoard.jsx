import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Result from "./components/Result";
// import "./styles/App.scss";
import Quiz from './quiz';
import Result from './Result';

const QuizBoard = () => {
  const [score, setScore] = useState(0);

  const updateScore = (points) => {
    setScore(score + points);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz updateScore={updateScore}/>} />
        <Route path="/result" element={<Result score={score} />} />
      </Routes>
    </Router>
  );
};

export default QuizBoard;