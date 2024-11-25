import "./admin.scss";
import Modal from 'react-modal';
import { useState } from "react";


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


const Planets = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
  }
    return(
        <div className="planets_manage">
            <button className="add">Add Planet</button>
            <table className="planets-table">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mars</td>
                        <td>The Red Planet, known for its iron oxide-rich surface.</td>
                        <td>
                            <button className="btn details">Details</button>
                            <button className="btn details">Modify</button>
                            <button className="btn delete">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
                </form>
            </Modal>
        </div>
    )
}

export default Planets;