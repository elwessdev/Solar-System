import { useState } from "react";
import "./admin.scss";
import PlanetPopup from "./Popup/planet";

const Planets = () => {
    const [popup, setPopup] = useState(false);
    return(
        <div className="manage_planets">
            <button className="add" onClick={e=>setPopup(true)}>Add Planet</button>
            <table className="planets-table">
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mars</td>
                        <td>The Red Planet, known for its iron oxide-rich surface.</td>
                        <td>
                            <button className="nrml" onClick={e=>setPopup(true)}>Details</button>
                            <button className="delete">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {popup && <PlanetPopup closePop={setPopup} />}
        </div>
    )
}

export default Planets;