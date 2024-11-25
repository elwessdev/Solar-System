// Components
import Home from './Home/home';
import Auth from './Auth/auth';
import News from './News/news';
import Quiz from './Quiz/quiz';
import Education from './Education/education';
import AdminDashboard from './Admin/AdminDashboard';


function App() {
  return (
    <div className='app'>
      <AdminDashboard/>
      {/* <Auth /> */}
      {/* <Home />
      <News />
      <Quiz />
      <Education />
      <Admin /> */}
    </div>
  )
}

export default App;