import React from 'react'
import { useState , useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import axios from 'axios';
import Cookies from 'js-cookie';


function Login() {

    const navigate = useNavigate()

    const [isEmail, setisEmail] = useState(false);

    const [isPassword, setisPassword] = useState(false);

    const [showPass, setshowPass] = useState(false);

    const [isLoading, setisLoading] = useState(false);

    const [inputs, setinputs] = useState({
        email : '',
        password : '',
    });

    


    const handdlesubmit =  async e =>{
        e.preventDefault()
        if(inputs.email.length === 0) return setisEmail(true)
        if(inputs.password.length === 0) return setisPassword(true)
        setisLoading(true)
        console.log(process.env.REACT_APP_API_URL)

          axios.post(process.env.REACT_APP_API_URL + '/login'  , inputs).then(e=>{
            Cookies.set('token' , e.data.token)   
            setisLoading(false) 
            return navigate('/');
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
          <form onSubmit={handdlesubmit} className='d-flex flex-column align-items-center justify-content-center'>
            <input className={isEmail ? 'input-primary error s-1' : 'input-primary s-1'} type='email' placeholder='email' value={inputs.email} onChange={e=>setinputs({...inputs , email : e.target.value})} />
            <input className={isPassword ? 'input-primary error s-1' : 'input-primary s-1'} type={showPass ? 'text' : 'password'} placeholder='password' value={inputs.password} onChange={e=>setinputs({...inputs , password : e.target.value})} />
            <div className='d-flex flex-row gap-2'>
              <input onClick={() => showPass ? setshowPass(false) : setshowPass(true)} type='checkbox' id='showpass' />
              <label htmlFor='showpass'>Show password</label>
            </div>
            {isLoading ? <Loading/> :<button type='submit' className='btn-primary'>Login</button> }
          </form>
          <p><Link to={'/admin/login'}>Click here</Link> to login as admin.</p>
      </div>
    </div>
  )
}

export default Login

