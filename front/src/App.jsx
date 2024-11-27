import { useState } from 'react';
import { Navigate, BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import './style/main.scss'
// Components
import Home from './Home/home';
import SignIn from './Auth/signin';
import SignUp from './Auth/signup';
import ForgotPassword from './Auth/forgotPassword';
import QuizBoard from './Quiz/QuizBoard';
import Navbar from './Home/nav';
import News from './News/news';
import Admin from './Admin/admin';
import axios from 'axios'
// import Education from './Education/education';

function App() {
    // Axios global configuration
    axios.defaults.baseURL = import.meta.env.VITE_BACK_LINK;
    axios.defaults.withCredentials = true; // Include cookies with requests
    // axios.defaults.headers.common["Content-Type"] = "application/json";
  const [navHiding, setNavHiding] = useState(false);
  return (
    <div className='app'>
      <Router>
        <Navbar navHiding={navHiding} />
        <Routes>
          <Route path="/" element={<Home setNavStatus={setNavHiding} navStatus={navHiding} />} />
          <Route  path="/signin" element={<ProtectedRoute><SignIn /></ProtectedRoute>} />
          <Route path="/signup" element={<ProtectedRoute><SignUp /></ProtectedRoute>} />
          <Route path="/forgot-password" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
          <Route path="/quiz" element={<QuizBoard />} />
          <Route path="/news" element={<News />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
