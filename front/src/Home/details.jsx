import { MdArrowForward } from "react-icons/md";
import Navbar from "./nav";
import "./home.scss";
// Images
import Earth from "../assets/earth2.png"
import Mars from "../assets/mars.png"
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const PlanetSlider = () => {
    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            loop
            >
            <SwiperSlide className="planet">
                <img src={Earth} alt="Planet 1" />
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
                    <a className="view-more">Login to view more details<MdArrowForward /></a>
                </div>
            </SwiperSlide>
            <SwiperSlide className="planet">
                <img src={Mars} alt="Planet 1" />
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
    );
};

const PlanetDetails = () => {
    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            loop
            >
            <SwiperSlide className="planet">
                <div className="img">
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
                    <a className="view-more">Login to view more details<MdArrowForward /></a>
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
    );
};

const Home = () => {
    return(
        <div className="home">
            <Navbar />
            <PlanetSlider />
        </div>
    )
}

export default Home;