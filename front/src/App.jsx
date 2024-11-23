import { useState } from 'react';
import { Navigate, BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
// Components
import Home from './Home/home';
import SignIn from './Auth/signin';
import SignUp from './Auth/signup';
import ForgotPassword from './Auth/forgotPassword';
import QuizBoard from './Quiz/QuizBoard';
import Navbar from './Home/nav';
import News from './News/news';
// import Education from './Education/education';
// import Admin from './Admin/admin';

function App() {
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
