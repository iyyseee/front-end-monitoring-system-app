import React from 'react'

function Dashboard({children}) {
  return (
    <div>
        <div className='nav bg-theme-primary p-2 fixed-top'>
            <div className='logo'>
                <h4 className='fc-primary-logo'>CB Transco</h4>
                <p className='fc-secondary-logo'>Monitoring</p>
            </div>
            <div>

            </div>
        </div>
        <div className='container'>
            <br/>
            <br/>
            <br/>
            {children}
        </div>
    </div>
  )
}

export default Dashboard