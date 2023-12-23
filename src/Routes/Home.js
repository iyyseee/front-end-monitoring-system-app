import React from 'react'
import Dashboard from '../Components/Dashboard'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <Dashboard>
      
        <Link to={'/checking'} className='col-xl-4 col-12 btn bg-gui p-3 border-rounded'>
          <div className='container'>
            <h5 className='text-start'>● Checking</h5>
            <div className='d-flex flex-row align-items-center'>
              <img className='icon-primary' src='/imgs/bus.png' alt=''/>
              <p><span className='fc-primary-logo'>CB-Transco</span> Hino Passenger Checking and Fare Collecting.</p>
            </div>
          </div>
        </Link>

        <Link to={'/transaction'} className='col-xl-4 col-12 btn bg-gui p-3 border-rounded'>
          <div className='container'>
            <h5 className='text-start'>● Transaction</h5>
            <div className='d-flex flex-row align-items-center'>
              <img className='icon-primary' src='/imgs/receipt.png' alt=''/>
              <p><span className='fc-primary-logo'>CB-Transco</span> Hino Transaction Records.</p>
            </div>
          </div>
        </Link>
    </Dashboard>
  )
}

export default Home
