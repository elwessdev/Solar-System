// Components
import Home from './Home/home';
import Auth from './Auth/auth';
import News from './News/news';
import Education from './Education/education';
import Admin from './Admin/admin';
import QuizBoard from './Quiz/QuizBoard';


function App() {
  return (
    <div className='app'>
      <QuizBoard/>
      {/* <Auth /> */}
      {/* <Home />
      <News />
      <Education />
      <Admin /> */}
    </div>
  )
}

export default App;