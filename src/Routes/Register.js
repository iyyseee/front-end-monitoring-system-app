import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../Components/Loading';

function Register() {

    const navigate = useNavigate()

    const [isEmail, setisEmail] = useState(false);

    const [isPassword, setisPassword] = useState(false);

    const [isFname, setisFname] = useState(false);

    const [isMname, setisMname] = useState(false);

    const [isLname, setisLname] = useState(false);

    const [showPass, setshowPass] = useState(false);

    const [isLoading, setisLoading] = useState(false);



    const [inputs, setinputs] = useState({
        email : '',
        password : '',
        first_name : '',
        middle_name : '',
        last_name : ''
    });

    


    const handdlesubmit =  async e =>{
        e.preventDefault()
        if(inputs.email.length === 0) return setisEmail(true)
        if(inputs.first_name.length === 0) return setisFname(true)
        if(inputs.middle_name.lenght === 0) return setisMname(true)
        if(inputs.last_name.length === 0) return setisLname(true)
        if(inputs.password.length === 0) return setisPassword(true)
        setisLoading(true)
        console.log(process.env.REACT_APP_API_URL)

          axios.post(process.env.REACT_APP_API_URL + '/register'  , inputs).then(e=>{
            console.log(e.data)
            return navigate('/login');
          }).catch(error =>{
            if(error.response.status == 422){
              console.log()
              setisEmail(true)
              setisPassword(true)
              setisLoading(false)
            }
          })
    }

    useEffect(() => {
        setisEmail(false)
        setisPassword(false)
        setisFname(false)
        setisMname(false)
        setisLname(false)
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
          <p>Register a dispatcher account</p>
          <form onSubmit={handdlesubmit} className='d-flex flex-column align-items-center justify-content-center'>
            <input className={isEmail ? 'input-primary error s-1' : 'input-primary s-1'} type='email' placeholder='email' value={inputs.email} onChange={e=>setinputs({...inputs , email : e.target.value})} />
            <input className={isFname ? 'input-primary error s-1' : 'input-primary s-1'} type='text' placeholder='first name' value={inputs.first_name} onChange={e=>setinputs({...inputs , first_name : e.target.value})} />
            <input className={isMname ? 'input-primary error s-1' : 'input-primary s-1'} type='text' placeholder='middle name' value={inputs.middle_name} onChange={e=>setinputs({...inputs , middle_name : e.target.value})} />
            <input className={isLname ? 'input-primary error s-1' : 'input-primary s-1'} type='text' placeholder='last name'  value={inputs.last_name} onChange={e=>setinputs({...inputs , last_name : e.target.value})} />
            <input className={isPassword ? 'input-primary error s-1' : 'input-primary s-1'} type={showPass ? 'text' : 'password'} placeholder='password' value={inputs.password} onChange={e=>setinputs({...inputs , password : e.target.value})} />
            <div className='d-flex flex-row gap-2'>
              <input onClick={() => showPass ? setshowPass(false) : setshowPass(true)} type='checkbox' id='showpass' />
              <label htmlFor='showpass'>Show password</label>
            </div>
            {isLoading ? <Loading/> :<button type='submit' className='btn-primary'>Login</button> }
          </form>
          <p><Link to={'/login'}>Click here</Link> to Register a dispatcher Account.</p>
      </div>
    </div>
  )
}

export default Register