import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AuthPage from "./components/authPage";
import AuthForm from "./components/authForm";
import HomePage from './components/homePage';
import Commande from "./components/commande";
import PlatPage from './components/platPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage/>}/>
        <Route path="/auth" element={<AuthForm/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path='/commande/:orderId' element={<Commande/>}/>
        <Route path='/plat' element={<PlatPage/>}/>
      </Routes>
    </Router>
  );
}

export default App
