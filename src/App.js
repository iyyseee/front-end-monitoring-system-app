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
import HinoT from './Routes/HinoT';
import AdminHome from './Admin/AdminHome';
import AdminLogin from './Admin/AdminLogin';
import Register from './Routes/Register';
import AdminPassngers from './Admin/AdminPassngers';
import AdminDestination from './Admin/AdminDestination';
import AdminDestinationByID from './Admin/AdminDestinationByID';
import AdminDispatcher from './Admin/AdminDispatcher';
import AdminDispatcherByID from './Admin/AdminDispatcherByID';
import AdminBus from './Admin/AdminBus';
import AdminBusByID from './Admin/AdminBusByID';
import AdminTransactions from './Admin/AdminTransactions';
import AdminTransactionByID from './Admin/AdminTransactionByID';
import AdminDailyCollection from './Admin/AdminDailyCollection';

function App() {
  return (
    <Router>
      <Routes>
        {/* user routes */}
        <Route path='/' element={<Home/>}/> 
        <Route path='/hino' element={<Hino/>}/> 
        <Route path='/hino/:id' element={<HinoT/>} />
        <Route path='/transaction' element={<Transaction/>}/> 
        <Route path='/transaction/:id' element={<Record/>} />
        <Route path='/checking' element={<Checking/>}/> 
        <Route path='/checking/:id' element={<CHPS/>}/> 
        <Route path='/login' element={<Login/>}/> 
        <Route path='/register' element={<Register/>}/>
        {/* admin routes */}
        <Route path='/admin' element={<AdminHome/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/admin/passengers' element={<AdminPassngers/>} />
        <Route path='/admin/destinations' element={<AdminDestination/>} />
        <Route path='/admin/destinations/:id' element={<AdminDestinationByID/>} />
        <Route path='/admin/dispatchers' element={<AdminDispatcher/>} />
        <Route path='/admin/dispatchers/:id' element={<AdminDispatcherByID/>} />
        <Route path='/admin/hino' element={<AdminBus/>} />
        <Route path='/admin/hino/:id' element={<AdminBusByID/>} />
        <Route path='/admin/transactions' element={<AdminTransactions/>} />
        <Route path='/admin/transactions/:id' element={<AdminTransactionByID/>} />
        <Route path='/admin/collection' element={<AdminDailyCollection/>} />
      </Routes>
    </Router>
  );
}

export default App;
