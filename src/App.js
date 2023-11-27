import './App.css';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Home from './Routes/Home';
import Login from './Routes/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/login' element={<Login/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
