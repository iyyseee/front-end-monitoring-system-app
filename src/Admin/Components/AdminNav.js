import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useEffect , useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

function AdminNav({children}) {

    const navigate = useNavigate()

    const logout = () =>{

      
    }

    useEffect(() => {    
        axios.get(process.env.REACT_APP_API_URL + '/isAuthorized',{
            headers : {'Authorization' : 'Bearer ' + Cookies.get('admin_token')}
          }).catch(error =>{
              if(error.response.status == 401) return navigate('/admin/login')
          }) 

    }, []);


  return (
    <div>
        <div className='nav bg-theme-primary p-2 fixed-top d-flex flex-row justify-content-between align-items-center'>
            <div className='logo'>
                <h4 className='fc-primary-logo'>CB Transco</h4>
                <p className='fc-secondary-logo'>Monitoring</p>
            </div>
            <div className='col-xl-2 col-12 mx-3'>
                <div className='d-flex flex-row justify-content-center'>
                    <Link to={'/admin'} className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/home.png' alt='' /></Link>
                    <Link to={'/admin/destinations'} className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/destination.png' alt='' /></Link>
                    <Link to={'/admin/passengers'} className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/passenger.png' alt='' /></Link>
                    <Link to={'/admin/dispatchers'} className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/dispatcher.png' alt='' /></Link>
                    <Link to={'/admin/hino'} className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/bus.png' alt='' /></Link>
                    <Link to={'/admin'} className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/bill.png' alt='' /></Link>
                    <button onClick={logout} className='btn navs-btn' ><img className='navs-icon' src='/imgs/navs/power-off.png' alt='' /></button>
                </div>
            </div>
        </div>
        <div className='container align-items-center d-flex flex-column gap-2'>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            {children}
        </div>
    </div>
  )
}

export default AdminNav