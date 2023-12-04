import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useEffect , useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

function Dashboard({children}) {

    const navigate = useNavigate()

    const logout = () =>{

        console.log(Cookies.get('token'))

        axios.post(process.env.REACT_APP_API_URL + '/logout',{
            headers : {'Authorization' : 'Bearer ' + Cookies.get('token')}
          }).then(e=>{
            console.log(e)
            /* if(e.status == 200){
                Cookies.remove('token')
                return navigate('/login')
            } */
          })
    }

    useEffect(() => {    
        axios.get(process.env.REACT_APP_API_URL + '/isAuthorized',{
          headers : {'Authorization' : 'Bearer ' + Cookies.get('token')}
        }).catch(error =>{
            if(error.response.status == 401) return navigate('/login')
        }) 
    }, []);


  return (
    <div>
        <div className='nav bg-theme-primary p-2 fixed-top d-flex flex-row justify-content-between align-items-center'>
            <div className='logo'>
                <h4 className='fc-primary-logo'>CB Transco</h4>
                <p className='fc-secondary-logo'>Monitoring</p>
            </div>
            <div>
                <Link to={'/'} className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/home.png' alt='' /></Link>
                <Link to={'/hino'} className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/bus.png' alt='' /></Link>
                <Link to={'/transaction'} className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/bill.png' alt='' /></Link>
                <button onClick={logout} className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/power-off.png' alt='' /></button>
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