import './App.css';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Home from './Routes/Home';
import Login from './Routes/Login';
import './styles/main.css'
import Hino from './Routes/Hino';
import Transaction from './Routes/Transaction';
import Checking from './Routes/Checking';
import CHPS from './Routes/CHPS';
import Record from './Routes/Record';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/hino' element={<Hino/>}/> 
        <Route path='/transaction' element={<Transaction/>}/> 
        <Route path='/transaction/:id' element={<Record/>} />
        <Route path='/checking' element={<Checking/>}/> 
        <Route path='/checking/:id' element={<CHPS/>}/> 
        <Route path='/login' element={<Login/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
