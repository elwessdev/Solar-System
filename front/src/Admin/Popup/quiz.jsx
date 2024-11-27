import { useState } from "react";
import "./popup.scss";
import "./ManagementPopUp.scss";
import axios from 'axios';

const QuizPopup = ({ PopUpOn, setPopUpOn, newQuestion, selectedQuestion }) => {
    const [formData, setFormData] = useState(
        PopUpOn === "Edit"
            ? { ...selectedQuestion, correctAnswers: selectedQuestion.correctAnswers || [] }
            : { id: "", question: "", options: [], correctAnswers: [], difficulty: "medium" }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...formData.options];
        updatedOptions[index] = value;
        setFormData((prev) => ({ ...prev, options: updatedOptions }));
    };

    const handleAddOption = () => {
        if (formData.options.length < 6) {
            setFormData((prev) => ({ ...prev, options: [...prev.options, ""] }));
        } else {
            alert("You can add a maximum of 6 options.");
        }
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = formData.options.filter((_, i) => i !== index);
        const updatedAnswers = formData.correctAnswers.filter((ans) => ans !== formData.options[index]);
        setFormData((prev) => ({ ...prev, options: updatedOptions, correctAnswers: updatedAnswers }));
    };

    const handleAnswerChange = (option) => {
        const isSelected = formData.correctAnswers?.includes(option);
        const updatedAnswers = isSelected
            ? formData.correctAnswers.filter((ans) => ans !== option)
            : [...(formData.correctAnswers || []), option];
        setFormData((prev) => ({ ...prev, correctAnswers: updatedAnswers }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.correctAnswers.length) {
            alert("At least one correct answer must be selected.");
            return;
        }

        console.log(formData);
        try {
            if (PopUpOn === "Edit") {
                await axios.put(`${import.meta.env.VITE_BACK_LINK}/quiz/${selectedQuestion.id}`, formData);
                newQuestion((prev) =>
                    prev.map((q) => (q.id === formData.id ? { ...formData } : q))
                );
            } else if (PopUpOn === "Add") {
                const response = await axios.post(`${import.meta.env.VITE_BACK_LINK}/quiz`, formData);
                newQuestion((prev) => [...prev, response.data]);
            }
            setPopUpOn("None");
        } catch (err) {
            console.error("Error while saving question:", err);
            alert("An error occurred while saving the question. Please try again.");
        }
    };
    

    return (
        <div className="popup">
            <div className="popup-content">
                <div className="close" onClick={() => setPopUpOn("None")}>
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path>
                    </svg>
                </div>
                <h3 className="title">{PopUpOn === "Edit" ? "Edit Question" : "Add New Question"}</h3>
                <div className="pop-quiz">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Question:
                            <input
                                type="text"
                                name="question"
                                value={formData.question}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <div className="options-section">
                            <h3>Options</h3>
                            {formData.options.map((option, index) => (
                                <div key={index} className="option-row">
                                    <input
                                        type="checkbox"
                                        checked={formData.correctAnswers.includes(option)}
                                        onChange={() => handleAnswerChange(option)}
                                    />
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        required
                                    />
                                    <button type="button" onClick={() => handleRemoveOption(index)}>Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={handleAddOption} disabled={formData.options.length >= 6}>
                                Add Option
                            </button>
                        </div>
                        <div className="difficulty-section">
                            <h3>Select Difficulty</h3>
                            <div className="sd">
                                <label>
                                    <input
                                        type="radio"
                                        name="difficulty"
                                        value="easy"
                                        checked={formData.difficulty === "easy"}
                                        onChange={handleChange}
                                    />
                                    Easy
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="difficulty"
                                        value="medium"
                                        checked={formData.difficulty === "medium"}
                                        onChange={handleChange}
                                    />
                                    Medium
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="difficulty"
                                        value="hard"
                                        checked={formData.difficulty === "hard"}
                                        onChange={handleChange}
                                    />
                                    Hard
                                </label>
                            </div>
                        </div>
                        <div className="popup-actions">
                            <button type="submit">{PopUpOn === "Edit" ? "Save Changes" : "Add Question"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuizPopup;
