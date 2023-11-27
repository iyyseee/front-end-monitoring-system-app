import React from 'react'
import Dashboard from '../Components/Dashboard'

function Home() {
  return (
    <Dashboard>
        <button className='col-xl-4 btn bg-gui p-3 border-rounded'>
          <div className='container'>
            <h5 className='text-start'>Checking</h5>
            <div className='d-flex flex-row align-items-center'>
              <img className='icon-primary' src='/imgs/bus.png' alt=''/>
              <p><span className='fc-primary-logo'>CB-Transco</span> Hino Passenger Checking and Fare Collecting.</p>
            </div>
          </div>
        </button>

        <button className='col-xl-4 btn bg-gui p-3 border-rounded'>
          <div className='container'>
            <h5 className='text-start'>Transaction</h5>
            <div className='d-flex flex-row align-items-center'>
              <img className='icon-primary' src='/imgs/receipt.png' alt=''/>
              <p><span className='fc-primary-logo'>CB-Transco</span> Hino Transaction Records.</p>
            </div>
          </div>
        </button>
    </Dashboard>
  )
}

export default Home
