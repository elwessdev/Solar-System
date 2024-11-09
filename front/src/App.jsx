// Components
import Home from './Home/home';
import Auth from './Auth/auth';
import News from './News/news';
import Quiz from './Quiz/quiz';
import Education from './Education/education';
import Admin from './Admin/admin';


function App() {
  return (
    <div className='app'>
      <Home />
      <Auth />
      <News />
      <Quiz />
      <Education />
      <Admin />
    </div>
  )
}

export default App;