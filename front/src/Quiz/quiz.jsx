import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "./data/questions";
import "./quiz.scss";

const Quiz = ({ updateScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleOptionChange = (option) => {
    if (questions[currentQuestion].isMultiple) {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    } else {
      setSelectedOptions([option]);
    }
  };

  const handleSubmit = () => {
    const correctAnswers = questions[currentQuestion].answer;

    const isCorrect = questions[currentQuestion].isMultiple
      ? correctAnswers.every((ans) => selectedOptions.includes(ans)) &&
        correctAnswers.length === selectedOptions.length
      : correctAnswers.includes(selectedOptions[0]);

    const feedbackState = questions[currentQuestion].options.reduce(
      (acc, option) => {
        acc[option] = {
          correct: correctAnswers.includes(option),
          selected: selectedOptions.includes(option),
        };
        return acc;
      },
      {}
    );

    setFeedback(feedbackState);
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = {
        selectedOptions,
        feedback: feedbackState,
      };
      return updated;
    });
    if (isCorrect) updateScore(1);
    if (currentQuestion === questions.length - 1) {
      setQuizComplete(true);
    } else {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOptions([]);
        setFeedback({});
      }, 2000);
    }
  };

  const handleSeeResult = () => {
    navigate("/result");
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const previous = currentQuestion - 1;
      setCurrentQuestion(previous);
      setSelectedOptions(answers[previous]?.selectedOptions || []);
      setFeedback(answers[previous]?.feedback || {});
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      const next = currentQuestion + 1;
      setCurrentQuestion(next);
      setSelectedOptions(answers[next]?.selectedOptions || []);
      setFeedback(answers[next]?.feedback || {});
    }
  };

  return (
    <div className="quiz">
      <h4 className="text-info">
        Question {currentQuestion + 1}/{questions.length}
      </h4>

      <h2 className="text-info">{questions[currentQuestion].question}</h2>

      <div className="options mt-4">
        {questions[currentQuestion].options.map((option, index) => (
          <div
            key={index}
            className={`form-check d-flex align-items-center mb-3 ${
              feedback[option]
                ? feedback[option].correct
                  ? "border border-success"
                  : "border border-danger"
                : ""
            }`}
          >
            <input
              type={questions[currentQuestion].isMultiple ? "checkbox" : "radio"}
              className={`form-check-input custom-input ${
                feedback[option]
                  ? feedback[option].correct
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              name="options"
              value={option}
              disabled={!!feedback[option]}
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
            />
            <label
              className={`form-check-label ${
                feedback[option]
                  ? feedback[option].correct
                    ? "text-success"
                    : "text-danger"
                  : ""
              }`} >
              {option}
            </label>
          </div>
        ))}
      </div>

      <div className="navigation-buttons mt-3">
        {currentQuestion > 0 && (
          <button className="btn btn-secondary me-2" onClick={handlePrevious}>
            Previous
          </button>
        )}
        {answers[currentQuestion] && currentQuestion < questions.length - 1 && (
          <button className="btn btn-secondary me-2" onClick={handleNext}>
            Next
          </button>
        )}
        {(!quizComplete && answers.length<=currentQuestion) &&(
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={selectedOptions.length === 0}
          >
            Submit
          </button>
        )}
        {quizComplete && (
          <button
            className="btn btn-success"
            onClick={handleSeeResult}
            disabled={selectedOptions.length === 0}>
            See Result
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
