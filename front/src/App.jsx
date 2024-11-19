import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
// Components
import Home from './Home/home';
import Auth from './Auth/auth';
import QuizBoard from './Quiz/QuizBoard';
import Navbar from './Home/nav';
// import News from './News/news';
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
          <Route path="/quiz" element={<QuizBoard />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;