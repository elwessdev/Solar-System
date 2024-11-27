import { useEffect, useState } from "react";
import "./admin.scss";
import PlanetPopup from "./Popup/planet";
import axios from "axios";

const Planets = () => {
    const [statusPop, setStatusPop] = useState("none");
    const [planets, setPlanets] = useState([]);
    const [details, setDetails] = useState();

    const getPlanets = async () => {
        try{
            const res = await axios.post(`${import.meta.env.VITE_BACK_LINK}/planet/planets`);
            if(res.data.planets){
                setPlanets(res.data.planets);
            } else {
                console.log(res.data.error);
            }
        } catch(err){
            console.log(err);
        }
    }
    const handleDelete = async(id) => {
        try{
            const res = await axios.delete(`${import.meta.env.VITE_BACK_LINK}/planet/delete/${id}`);
            if(res.data.success){
                getPlanets();
            } else {
                console.log(res.data.error);
            }
        } catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getPlanets();
    },[])

    return(
        <div className="manage_planets">
            <button className="add" onClick={e=>setStatusPop("add")}>Add Planet</button>
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
                    {planets && (
                        planets.map((planet, idx) => (
                            <tr key={idx}>
                                <td>{idx+1}</td>
                                <td>{planet?.name}</td>
                                <td className="tx">{planet?.description}</td>
                                <td>
                                    <button className="nrml" onClick={e=>{
                                        setStatusPop("modify");
                                        setDetails(planet);
                                    }}>Details</button>
                                    <button className="delete" onClick={e=>handleDelete(planet?._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {statusPop!="none" && <PlanetPopup closePop={setStatusPop} status={statusPop}  planet={details}/>}
        </div>
    )
}

export default Planets;