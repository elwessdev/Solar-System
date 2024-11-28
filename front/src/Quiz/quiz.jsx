import { useState } from "react";
import "./quiz.scss";

const Quiz = ({ quizzes, updateScore, score }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    const correctAnswers = quizzes[currentQuestion].correctAnswers;
    const isCorrect =
      correctAnswers.length === selectedOptions.length &&
      correctAnswers.every((ans) => selectedOptions.includes(ans));
    const feedbackState = quizzes[currentQuestion].options.reduce(
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

    if (isCorrect){
      updateScore(1);
      console.log("Correct");
    } else{
      console.log("Wrong");
    }

    if (currentQuestion === quizzes.length - 1) {
      setQuizComplete(true);
    }
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
    if (currentQuestion < quizzes.length - 1) {
      const next = currentQuestion + 1;
      setCurrentQuestion(next);
      setSelectedOptions(answers[next]?.selectedOptions || []);
      setFeedback(answers[next]?.feedback || {});
    }
  };

  return (
    <div className="quiz">
      {quizComplete ? (
        <div className="result-section">
          <h2>Quiz Complete! See your results below:</h2>
          <p>Your final score is: {score} </p>
        </div>
      ) : (
        <>
          <h4 className="text-info">
            Question {currentQuestion + 1}/{quizzes.length}
          </h4>
          <h2 className="text-info">{quizzes[currentQuestion].question}</h2>
          <div className="options mt-4">
            {quizzes[currentQuestion].options.map((option, index) => (
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
                  type={"checkbox"}
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
                  }`}
                >
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
            {currentQuestion < quizzes.length - 1 && (
              <button
                className="btn btn-secondary me-2"
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
              >
                Next
              </button>
            )}
            {currentQuestion < quizzes.length && (
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={selectedOptions.length == 0}
              >
                Submit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
