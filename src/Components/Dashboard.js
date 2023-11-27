import React from 'react'

function Dashboard({children}) {
  return (
    <div>
        <div className='nav bg-theme-primary p-2 fixed-top d-flex flex-row justify-content-between align-items-center'>
            <div className='logo'>
                <h4 className='fc-primary-logo'>CB Transco</h4>
                <p className='fc-secondary-logo'>Monitoring</p>
            </div>
            <div>
                <button className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/home.png' alt='' /></button>
                <button className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/bus.png' alt='' /></button>
                <button className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/bill.png' alt='' /></button>
                <button className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/power-off.png' alt='' /></button>
            </div>
        </div>
        <div className='container align-items-center d-flex flex-column gap-2'>
            <br/>
            <br/>
            <br/>
            <br/>
            {children}
        </div>
    </div>
  )
}

export default Dashboard