import { useState, useContext, useEffect } from "react";
import Quiz from './Quiz';
import "./quiz.scss";
import { FaCheck } from "react-icons/fa6";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import axios from 'axios';

const QuizBoard = () => {
  const { loginStatus } = useContext(UserContext);
  const [score, setScore] = useState(0);
  const [quizStatus, setQuizStatus] = useState("welcomeQuiz");
  const [quizzes, setQuizzes] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);

  useEffect(() => {
    if (loginStatus) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACK_LINK}/quiz`);
          setQuizzes(response.data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    }
  }, [loginStatus]);


  const updateScore = (points) => {
    setScore(score + points);
  };

  const handleDifficultyChange = (e) => {
    const value = e.target.value;
    setSelectedDifficulties((prev) => {
      if (prev.includes(value)) {
        return prev.filter((difficulty) => difficulty !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleStartQuiz = () => {
    const filteredQuizzes = quizzes.filter((quiz) =>
      selectedDifficulties.includes(quiz.difficulty)
    );
    const nbrQuestions = Math.min(Math.floor(Math.random() * 7) + 1, filteredQuizzes.length);
    console.log(nbrQuestions);
    if (filteredQuizzes.length >= nbrQuestions) {
      const randomQuizzes = [];
      while (randomQuizzes.length < nbrQuestions) {
        const randomIndex = Math.floor(Math.random() * filteredQuizzes.length);
        const randomQuiz = filteredQuizzes[randomIndex];
        if (!randomQuizzes.includes(randomQuiz)) {
          randomQuizzes.push(randomQuiz);
        }
      }
      setQuizStatus("startQuiz");
      setQuizzes(randomQuizzes);
    } else {
      alert("Not enough quizzes available for the selected difficulties.");
    }
  };
  
  


  return (
    <div className="quiz_board">
      {quizStatus === "welcomeQuiz" && (
        <div className="quiz_welcome">
          <h1 className="quiz-title">Welcome to Quiz</h1>
          <div className="difficulty-section">
            <h2>Select Difficulty:</h2>
            <div className="difficulty-options">
              <label>
                <input
                  type="checkbox"
                  value="easy"
                  checked={selectedDifficulties.includes("easy")}
                  onChange={handleDifficultyChange}
                />
                <FaCheck />
                <p>Easy</p>
              </label>
              <label>
                <input
                  type="checkbox"
                  value="medium"
                  checked={selectedDifficulties.includes("medium")}
                  onChange={handleDifficultyChange}
                />
                <FaCheck />
                <p>Medium</p>
              </label>
              <label>
                <input
                  type="checkbox"
                  value="hard"
                  checked={selectedDifficulties.includes("hard")}
                  onChange={handleDifficultyChange}
                />
                <FaCheck />
                <p>Hard</p>
              </label>
            </div>
          </div>
          {loginStatus ? (
            <button onClick={handleStartQuiz} className="start-button">
              Start Quiz
            </button>
          ) : (
            <Link className="lg" to="/signin">
              Login to start quiz
            </Link>
          )}
        </div>
      )}
      {quizStatus === "startQuiz" && (
        <Quiz
          quizzes={quizzes}
          updateScore={updateScore}
          score={score}
        />
      )}
    </div>
  );
};

export default QuizBoard;
