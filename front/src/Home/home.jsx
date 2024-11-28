import "./home.scss";
import {useContext, useEffect, useState} from "react";
import { MdArrowForward } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
// import LazyLoad from "react-lazyload";
import 'swiper/swiper-bundle.css';
// Components
import PlanetDetails from "./planetDetails";
// Assets
// import Earth from "../assets/earth2.png"
// import Mars from "../assets/mars.png"
import axios from "axios";

// const PlanetDetails = React.lazy(() => import('./planetDetails'));


const Home = ({setNavStatus,navStatus,searchKeyWord}) => {
    const { loginStatus, user } = useContext(UserContext);
    const [planets, setPlanets] = useState([]);
    const [details, setDetails] = useState();
    const [filteredPlanets, setFilteredPlanets] = useState([]);

    const getPlanets = async () => {
        try{
            const res = await axios.post(`${import.meta.env.VITE_BACK_LINK}/planet/planets`);
            if(res.data.planets){
                setPlanets(res.data.planets);
            } else {
                console.log(res.data.error);
            }
        } catch(err){
            console.log(err, "get planets");
        }
    }

    useEffect(() => {
        if (searchKeyWord) {
            const filtered = planets.filter(planet =>
                planet.name.toLowerCase().includes(searchKeyWord.toLowerCase())
            );
            if(filtered.length){
                setFilteredPlanets(filtered);
            } else {
                setFilteredPlanets(planets);
            }
        } else {
            setFilteredPlanets(planets);
        }
        // console.log(filteredPlanets);
    }, [searchKeyWord, planets]);

    useEffect(() => {
        getPlanets();
    }, []);
    console.log("home=>",loginStatus, user);
    return(
        <div className="home">
            <Swiper className="planets"
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                loop
                >
                    {filteredPlanets.map((planet,idx) =>
                            <SwiperSlide className="planet" key={idx}>
                                    <div className={`img ${navStatus ? 'show_details' : ''}`}>
                                        <img src={planet?.imageUrl} alt="Planet 1" />
                                    </div>
                                    <div className="details">
                                        <div className="list">
                                            <div className="detail">
                                                <p>Name</p>
                                                <h3>{planet?.name}</h3>
                                            </div>
                                            <div className="detail">
                                                <p>Distance au Soleil</p>
                                                <h3>{planet?.distanceFromSun}</h3>
                                            </div>
                                            <div className="detail">
                                                <p>Masse</p>
                                                <h3>{planet?.mass}</h3>
                                            </div>
                                        </div>
                                        
                                        {loginStatus && <a className="view-more" onClick={e=>{
                                            setNavStatus(true);
                                            setDetails(planet);
                                        }}>View more details<MdArrowForward /></a>}
                                        {!loginStatus && <Link to="/signin" className="view-more">Login to view more details<MdArrowForward /></Link>}
                                    </div>
                        </SwiperSlide>
                    )}
            </Swiper>
            <PlanetDetails setNavStatus={setNavStatus} navStatus={navStatus} planet={details} setDe={setDetails}  />
        </div>
    )
}
export default Home;