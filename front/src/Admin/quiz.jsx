import { useState } from "react";
import questionsData from "./data/questions.json";
// import ManagementPopUp from "./ManagementPopUp";
import QuizPopup from "./Popup/quiz";

const QuizManagement = () => {
  const [questions, setQuestions] = useState(questionsData.questions);
  const [PopUpOn, setPopUpOn] = useState("None");
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleEdit = (id) => {
    const questionToEdit = questions.find((q) => q.id === id);
    setSelectedQuestion(questionToEdit);
    setPopUpOn("Edit");
  };

  const handleAdd = () => {
    setSelectedQuestion(null);
    setPopUpOn("Add");
  };

  const handleDelete = (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
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
            <th>Multiple Choice</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q,idx) => (
            <tr key={q.id}>
              <td>{idx+1}</td>
              <td>{q.question}</td>
              <td>{q.difficulty}</td>
              <td>{q.isMultiple ? "Yes" : "No"}</td>
              <td>
                <button className="nrml" onClick={() => handleEdit(q.id)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(q.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {PopUpOn !== "None" && (
        // <ManagementPopUp
        //   PopUpOn={PopUpOn}
        //   setPopUpOn={setPopUpOn}
        //   newQuestion={setQuestions} 
        //   selectedQuestion={selectedQuestion} 
        // />
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
