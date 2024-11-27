import { useEffect, useState } from "react";
import "./popup.scss";
import axios from "axios";

const PlanetPopup = ({closePop,status,planet}) => {
    const [photo, setPhoto] = useState();
    const [name, setName] = useState();
    const [distance, setDistance] = useState();
    const [masse, setMass] = useState();
    const [description, setDescription] = useState();
    const [gallery, setGallery] = useState([]);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState();

    const handleImages = (index, value) => {
        const newGallery = [...gallery];
        newGallery[index] = value;
        setGallery(newGallery);
    };
    const handleVideos = (index, value) => {
        const newVideos = [...videos];
        newVideos[index] = value;
        setVideos(newVideos);
    };

    const handleAddPlanet = async () => {
        try{
            const res = await axios.post(`${import.meta.env.VITE_BACK_LINK}/planet/add`,{photo,name,distance,masse,description,gallery,videos});
            if(res.data.success){
                console.log("Done");
                closePop("none");
            }
            // console.log(res.data.error.errors);
            if(res.data.error.errors){
                let errorsList = res.data.error.errors;
                // setError(errorsList);
                Object.keys(errorsList).forEach(key => {
                    console.log(errorsList[key].message);
                });
            }
        } catch(err){
            console.log(err, "Add planet");
        }
    }

    const handleModify = async () => {
        try{
            let id = planet?._id;
            const res = await axios.post(`${import.meta.env.VITE_BACK_LINK}/planet/edit`,{id,photo,name,distance,masse,description,gallery,videos});
            if(res.data.success){
                console.log("Done");
                closePop("none");
                location.reload();
            }
            // console.log(res.data.error.errors);
            if(res.data.error.errors){
                let errorsList = res.data.error.errors;
                // setError(errorsList);
                Object.keys(errorsList).forEach(key => {
                    console.log(errorsList[key].message);
                });
            }
        } catch(err){
            console.log(err, "modify planet");
        }
    }

    useEffect(()=>{
        if(status=="modify"){
            setName(planet?.name);
            setDistance(planet?.distanceFromSun);
            setMass(planet?.mass);
            setDescription(planet?.description);
            setPhoto(planet?.imageUrl);
            setGallery(planet?.gallery);
            setVideos(planet?.videos);
        }
    },[])

    return(
        <div className="popup">
            <div className="popup-content">
                <div className="close" onClick={e=>closePop("none")}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path></svg>
                </div>
                <h3 className="title">Add Planet</h3>
                <div className="pop-planet">
                    <form>
                        <div className="sec">
                            <h3>Details</h3>
                            <input type="text" placeholder="Photo (link)" value={photo} onChange={e=>setPhoto(e.target.value)} />
                            <input type="text" placeholder="Planet name" value={name} onChange={e=>setName(e.target.value)} />
                            <input type="number" placeholder="Distance au Soleil" value={distance} onChange={e=>setDistance(e.target.value)} />
                            <input type="text" value={masse} onChange={e=>setMass(e.target.value)} placeholder="Masse" />
                            <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="sec">
                            <h3>Gallery</h3>
                            <input type="text" placeholder="Image 1 (link)" value={gallery[0]} onChange={e=>handleImages(0, e.target.value)} />
                            <input type="text" placeholder="Image 2 (link)" value={gallery[1]} onChange={e=>handleImages(1, e.target.value)}/>
                            <input type="text" placeholder="Image 3 (link)" value={gallery[2]} onChange={e=>handleImages(2, e.target.value)}/>
                            <input type="text" placeholder="Image 1 (link)" value={gallery[3]} onChange={e=>handleImages(3, e.target.value)}/>
                        </div>
                        <div className="sec">
                            <h3>Videos</h3>
                            <input type="text" placeholder="Videos 1 (Youtube link)" value={videos[0]} onChange={e=>handleVideos(0, e.target.value)} />
                            <input type="text" placeholder="Videos 2 (Youtube link)" value={videos[1]} onChange={e=>handleVideos(1, e.target.value)} />
                        </div>
                        {status=="add" && <button type="button" onClick={e=>handleAddPlanet()}>Add</button> }
                        {status=="modify" && <button type="button" onClick={e=>handleModify()}>Save</button> }
                        <div className="error">{error}</div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PlanetPopup;