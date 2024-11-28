import { useContext } from 'react';
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import "./nav.scss";
import { UserContext } from "../context/UserContext";

const Navbar = ({navHiding}) => {
    const {loginStatus,user,logout}  = useContext(UserContext);
    // console.log(loginStatus);
    return (
        <nav className={`navbar ${navHiding ? 'hide_nav' : ''}`}>
            <div className="navbar__logo">Solar System</div>
            <div className="rg">
                {/* <div className="search">
                    <input type="text" placeholder="Search..." />
                    <FaSearch className="navbar__search-icon" />
                </div> */}
                <ul className="links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/quiz">Quiz</Link></li>
                    {(user?.email == "bms93951@gmail.com" || user?.email == "tabaiiyadh317@gmail.com" || user?.email == "maizaaymena@gmail.com") &&  <li><Link to="/admin">Dashboard</Link></li>}
                    {/* <li><Link to="/learn">Learn</Link></li> */}
                </ul>
                {!loginStatus && (
                    <div className="buttons">
                        <Link className="btn login" to="/signin">Login</Link>
                        <Link className="btn signup" to="/signup">Sign Up</Link>
                    </div>
                )}
                {loginStatus && (
                    <div className='user_data'>
                        <img className='pp' src="https://api.dicebear.com/9.x/thumbs/svg?seed=Mason" />
                        <p>{user.username}</p>
                        <button className="btn" onClick={e=>logout()}>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;