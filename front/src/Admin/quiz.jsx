import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizPopup from "./Popup/quiz";

const QuizManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [PopUpOn, setPopUpOn] = useState("None");
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACK_LINK}/quiz`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [questions]);

  const handleEdit = (id) => {
    const questionToEdit = questions.find((q) => q.id === id);
    setSelectedQuestion(questionToEdit);
    setPopUpOn("Edit");
  };

  const handleAdd = () => {
    setSelectedQuestion(null);
    setPopUpOn("Add");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACK_LINK}/quiz/${id}`);
      setQuestions((prev) => prev.filter((q) => String(q.id) !== String(id)));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="manage_quiz">
      <button className="add" onClick={handleAdd}>Add New Question</button>
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Question</th>
            <th>Difficulty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.length !== 0
            ? questions.map((q, idx) => (
                <tr key={q.id}>
                  <td>{idx + 1}</td>
                  <td>{q.question}</td>
                  <td>{q.difficulty}</td>
                  <td>
                    <div className="btns">
                      <button className="nrml" onClick={() => handleEdit(q.id)}>Edit</button>
                      <button className="delete" onClick={() => handleDelete(q.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            : <tr><td colSpan={4}>No Quizzes yet</td></tr>}
        </tbody>
      </table>
      {PopUpOn !== "None" && (
        <QuizPopup
          PopUpOn={PopUpOn}
          setPopUpOn={setPopUpOn}
          newQuestion={setQuestions}
          selectedQuestion={selectedQuestion}
        />
      )}
    </div>
  );
};

export default QuizManagement;
