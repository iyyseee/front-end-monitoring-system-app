import React from 'react'
import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom';

function Login() {

    const [isEmail, setisEmail] = useState(false);

    const [isPassword, setisPassword] = useState(false);

    const [showPass, setshowPass] = useState(false);

    const [inputs, setinputs] = useState({
        email : '',
        password : '',
    });


    const handdlesubmit = ()=>{
        if(inputs.email.length == 0) return setisEmail(true);
        if(inputs.password.length == 0) return setisPassword(true)
    }

    useEffect(() => {
        setisEmail(false)
        setisPassword(false)
    }, [inputs]);


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
          <input className={isEmail ? 'input-primary error' : 'input-primary'} type='email' placeholder='email' value={inputs.email} onChange={e=>setinputs({...inputs , email : e.target.value})} />
          <input className={isPassword ? 'input-primary error' : 'input-primary'} type={showPass ? 'text' : 'password'} placeholder='password' value={inputs.password} onChange={e=>setinputs({...inputs , password : e.target.value})} />
          <div className='d-flex flex-row gap-2'>
            <input onClick={() => showPass ? setshowPass(false) : setshowPass(true)} type='checkbox' id='showpass' />
            <label htmlFor='showpass'>Show password</label>
          </div>
          <button onClick={handdlesubmit} className='btn-primary'>Login</button>
          <p><Link to={'/admin/login'}>Click here</Link> to login as Admin.</p>
      </div>
    </div>
  )
}

export default Login

