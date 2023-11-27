import React from 'react'

function Login() {
  return (
    <div> 
      <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
          <p>Login your dispatcher account</p>
          <input className='input-primary' type='email' placeholder='email' />
          <input className='input-primary' type='password' placeholder='password' />
          <button className='btn-primary'>Login</button>
      </div>
    </div>
  )
}

export default Login