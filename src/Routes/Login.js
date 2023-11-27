import React from 'react'

function Login() {
  return (
    <div> 
      <div className='d-flex flex-column align-items-center justify-content-center  vh-100'>
          <div>
              <h1 className='fc-primary-logo lh-sm'>CB-Transco</h1>
              <div className='d-flex flex-row align-items-center'>
                <img className='icon-primary' src='/imgs/bus.png' alt='' />
                <h6 className='monitor'><b>Monitoring</b></h6>
              </div>
          </div>
          <p>Login your dispatcher account</p>
          <input className='input-primary' type='email' placeholder='email' />
          <input className='input-primary' type='password' placeholder='password' />
          <button className='btn-primary'>Login</button>
      </div>
    </div>
  )
}

export default Login

