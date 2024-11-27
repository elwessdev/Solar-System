import { createRoot } from 'react-dom/client'
import './style/main.scss'
import App from './App.jsx'
import { UserProvider } from "./context/UserContext"

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>,
)