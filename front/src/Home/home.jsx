import { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import Navbar from "./nav";
import "./home.scss";
// Images
import Earth from "../assets/earth2.png"
import Mars from "../assets/mars.png"
import GallEarth1 from "../assets/gal-earth1.jpg"
import GallEarth2 from "../assets/gal-earth2.jpg"
import GallEarth3 from "../assets/gal-earth3.jpg"
import GallEarth4 from "../assets/gal-earth4.jpg"
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import 'swiper/swiper-bundle.css';


const Home = () => {
    const [openDetails, setOpenDetails] = useState(false);
    const openPlanetDetails = (id) => {
        setOpenDetails(true);
    }
    return(
        <div className="home">
            <Navbar openWindow={openDetails} />
            <Swiper className="planets"
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                loop
                >
                <SwiperSlide className="planet">
                    <div className={`img ${openDetails ? 'show_details' : ''}`}>
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
                                <h3>Test</h3>
                            </div>
                            <div className="detail">
                                <p>Masse</p>
                                <h3>Test</h3>
                            </div>
                        </div>
                        {/* <a className="view-more">Login to view more details<MdArrowForward /></a> */}
                        <a className="view-more" onClick={e=>openPlanetDetails(5300)}>View more details<MdArrowForward /></a>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="planet">
                    <div className="img">
                        <img src={Mars} alt="Planet 1" />
                    </div>
                    <div className="details">
                        <div className="list">
                            <div className="detail">
                                <p>Nom</p>
                                <h3>Mars</h3>
                            </div>
                            <div className="detail">
                                <p>Distance au Soleil</p>
                                <h3>Test</h3>
                            </div>
                            <div className="detail">
                                <p>Masse</p>
                                <h3>Test</h3>
                            </div>
                        </div>
                        <a className="view-more">Login to view more details<MdArrowForward /></a>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className={`planet_details_window ${openDetails ? 'showIt' : ''}`}>
                {/* Close Button */}
                <div className="close" onClick={e=>setOpenDetails(!openDetails)}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="infos">
                    <h1>Earth</h1>
                    <p>
                    Earth is the third planet from the Sun and the only known celestial body that supports life. It has a unique environment with vast oceans, diverse landforms, and an atmosphere rich in oxygen. Earth’s surface is 71% water, making it a "blue planet," while its ecosystems sustain millions of species. It orbits the Sun in the habitable zone, with a moderate climate regulated by its atmosphere and magnetic field.
                    </p>
                </div>
                <div className="galleries">
                    <div className="gall">
                        <img src={GallEarth1} />
                    </div>
                    <div className="gall">
                        <img src={GallEarth2} />
                    </div>
                    <div className="gall">
                        <img src={GallEarth3} />
                    </div>
                    <div className="gall">
                        <img src={GallEarth4} />
                    </div>
                </div>
                <div className="videos">
                    <div className="video">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/AmrrSfiMxGA?si=BvNrDfl-aoN2rxbT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className="video">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/AmrrSfiMxGA?si=BvNrDfl-aoN2rxbT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;