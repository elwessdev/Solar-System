import { FaSearch } from 'react-icons/fa';
import "./nav.scss";

const Navbar = ({onShowPlanetDetails}) => {
    return (
        <nav className={`navbar ${onShowPlanetDetails ? 'show_details_hide' : ''}`}>
            <div className="navbar__logo">Solar System</div>
            <div className="rg">
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <FaSearch className="navbar__search-icon" />
                </div>
                <ul className="links">
                    <li><a href="#news">News</a></li>
                    <li><a href="#quiz">Quiz</a></li>
                    <li><a href="#learn">Learn</a></li>
                </ul>
                <div className="buttons">
                    <button className="btn login">Login</button>
                    <button className="btn signup">Sign Up</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;