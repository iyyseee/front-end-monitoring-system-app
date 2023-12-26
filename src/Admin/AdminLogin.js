import React from 'react'
import { useState , useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loading from '../Components/Loading';

function AdminLogin() {

  const navigate = useNavigate()

    const [isUsername, setisUsername] = useState(false);

    const [isPassword, setisPassword] = useState(false);

    const [showPass, setshowPass] = useState(false);

    const [isLoading, setisLoading] = useState(false);

    const [inputs, setinputs] = useState({
        username : '',
        password : '',
    });

  const handdlesubmit =  async e =>{
    e.preventDefault()
    if(inputs.username.length === 0) return setisUsername(true)
    if(inputs.password.length === 0) return setisPassword(true)
    setisLoading(true)
    axios.post(process.env.REACT_APP_API_URL + '/admin/login', inputs).then(e=>{
      if(e.status === 200){
        Cookies.set('admin_token' , e.data.token)
        return navigate('/admin')
      }
    }).catch(error =>{
      console.log(error)
      if(error.response.status === 422){
        setisUsername(true)
        setisPassword(true)
        return setisLoading(false)
      }
      if(axios.isCancel(error)){
          alert(`[status: ${error.response.status} ] Error while sending your request please try again later.`)
          return setisLoading(false)
      }
  })
    return setisLoading(false)
  }

  useEffect(() => {
      setisUsername(false)
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
          <p>Login as Admin</p>
          <form onSubmit={handdlesubmit} className='d-flex flex-column align-items-center justify-content-center'>
            <input className={isUsername ? 'input-primary error s-1' : 'input-primary s-1'} type='text' placeholder='username' value={inputs.username} onChange={e=>setinputs({...inputs , username : e.target.value})} />
            <input className={isPassword ? 'input-primary error s-1' : 'input-primary s-1'} type={showPass ? 'text' : 'password'} placeholder='password' value={inputs.password} onChange={e=>setinputs({...inputs , password : e.target.value})} />
            <div className='d-flex flex-row gap-2'>
              <input onClick={() => showPass ? setshowPass(false) : setshowPass(true)} type='checkbox' id='showpass' />
              <label htmlFor='showpass'>Show password</label>
            </div>
            {isLoading ? <Loading/> :<button type='submit' className='btn-primary'>Login</button> }
          </form>
      </div>
    </div>
  )
}

export default AdminLogin