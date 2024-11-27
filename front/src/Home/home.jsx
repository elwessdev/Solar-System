import {useContext} from "react";
import { MdArrowForward } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import 'swiper/swiper-bundle.css';
import "./home.scss";
// Components
import PlanetDetails from "./planetDetails";
// Assets
import Earth from "../assets/earth2.png"
import Mars from "../assets/mars.png"


const Home = ({setNavStatus,navStatus}) => {
    const { loginStatus } = useContext(UserContext);
    return(
        <div className="home">
            <Swiper className="planets"
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                loop
                >
                    {[...Array(10)].map(() =>
                        <>
                            <SwiperSlide className="planet">
                                <div className={`img ${navStatus ? 'show_details' : ''}`}>
                                    <img src={Earth} alt="Planet 1" />
                                </div>
                                <div className="details">
                                    <div className="list">
                                        <div className="detail">
                                            <p>Nom</p>
                                            <h3>Earth</h3>
                                        </div>
                                        <div className="detail">
                                            <p>Distance au Soleil</p>
                                            <h3>93 million miles</h3>
                                        </div>
                                        <div className="detail">
                                            <p>Masse</p>
                                            <h3>5.972×10^24 kg</h3>
                                        </div>
                                    </div>
                                    
                                    {loginStatus && <a className="view-more" onClick={e=>setNavStatus(true)}>View more details<MdArrowForward /></a>}
                                    {!loginStatus && <Link to="/signin" className="view-more">Login to view more details<MdArrowForward /></Link>}
                                </div>
                            </SwiperSlide>
                        </>
                    )}
            </Swiper>
            <PlanetDetails setNavStatus={setNavStatus} navStatus={navStatus}  />
        </div>
    )
}
export default Home;