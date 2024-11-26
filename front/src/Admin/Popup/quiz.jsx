import { useState } from "react";
import "./popup.scss";
import "./ManagementPopUp.scss";

const QuizPopup = ({ PopUpOn, setPopUpOn, newQuestion, selectedQuestion }) => {
    const [formData, setFormData] = useState(
        PopUpOn === "Edit"
            ? { ...selectedQuestion }
            : { id: "", question: "", options: [], answer: [], isMultiple: false, difficulty: "Medium" }
    );
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;
        setFormData((prev) => ({ ...prev, [name]: val }));
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
        setFormData((prev) => ({ ...prev, options: updatedOptions }));
    };
    const handleAnswerChange = (e) => {
        const { value } = e.target;
        if (formData.isMultiple) {
            const answers = formData.answer.includes(value)
            ? formData.answer.filter((ans) => ans !== value) 
            : [...formData.answer, value];
            setFormData((prev) => ({ ...prev, answer: answers }));
        } else {
            setFormData((prev) => ({ ...prev, answer: value }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (PopUpOn === "Edit") {
            newQuestion((prev) =>
            prev.map((q) => (q.id === formData.id ? { ...formData } : q))
            );
        } else if (PopUpOn === "Add") {
            newQuestion((prev) => [...prev, { ...formData, id: prev.length + 1 }]);
        }
        setPopUpOn("None");
    };
    const handleCancel = () => {
        setPopUpOn("None");
    };
    return(
        <div className="popup">
            <div className="popup-content">
                <div className="close" onClick={e=>setPopUpOn("None")}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path></svg>
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
                                <input type="checkbox"/>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    required
                                />
                                <button type="button" onClick={() => handleRemoveOption(index)}>Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddOption} disabled={formData.options.length >= 6}>Add Option</button>
                    </div>
                    {/* <label>
                        Is Multiple Choice:
                        <input
                        type="checkbox"
                        name="isMultiple"
                        checked={formData.isMultiple}
                        onChange={handleChange}
                        />
                    </label>
                    <div className="answers-section">
                        <h3>Select Correct Answer(s)</h3>
                        {formData.options.map((option, index) => (
                            <label key={index}>
                                <input
                                    type={formData.isMultiple ? "checkbox" : "radio"}
                                    name="answer"
                                    value={option}
                                    checked={
                                        formData.isMultiple
                                        ? formData.answer.includes(option)
                                        : formData.answer === option
                                    }
                                    onChange={handleAnswerChange}
                                />
                                {option}
                            </label>
                        ))}
                    </div> */}
                    <div className="difficulty-section">
                        <h3>Select Difficulty</h3>
                        <div className="sd">
                            <label>
                                <input
                                    type="radio"
                                    name="difficulty"
                                    value="Easy"
                                    checked={formData.difficulty === "Easy"}
                                    onChange={handleChange}
                                />
                                Easy
                            </label>
                            <label>
                            <input
                                type="radio"
                                name="difficulty"
                                value="Medium"
                                checked={formData.difficulty === "Medium"}
                                onChange={handleChange}
                            />
                            Medium
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="difficulty"
                                    value="Hard"
                                    checked={formData.difficulty === "Hard"}
                                    onChange={handleChange}
                                />
                                Hard
                            </label>
                        </div>
                    </div>
                    <div className="popup-actions">
                        <button type="submit">{PopUpOn === "Edit" ? "Save Changes" : "Add Question"}</button>
                        {/* <button type="button" onClick={handleCancel}>Cancel</button> */}
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default QuizPopup;