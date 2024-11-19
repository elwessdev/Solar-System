import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import "./nav.scss";

const Navbar = ({navHiding}) => {
    return (
        <nav className={`navbar ${navHiding ? 'hide_nav' : ''}`}>
            <div className="navbar__logo">Solar System</div>
            <div className="rg">
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <FaSearch className="navbar__search-icon" />
                </div>
                <ul className="links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/quiz">Quiz</Link></li>
                    <li><Link to="/learn">Learn</Link></li>
                </ul>
                <div className="buttons">
                    <Link className="btn login" to="/login">Login</Link>
                    <Link className="btn signup" to="/login">Sign Up</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;