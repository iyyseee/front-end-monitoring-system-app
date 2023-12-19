import React from 'react'
import { useState , useEffect } from 'react'
import { Link, json, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import axios from 'axios';
import Cookies from 'js-cookie';
import AdminNav from './Components/AdminNav';

function AdminHome() {

  const [total_collection, settotal_collection] = useState(0);

  const [total_unit, settotal_unit] = useState(0);

  const [isLoading, setisLoading] = useState(false);


  useEffect(() => {
    setisLoading(true)
    axios.get(process.env.REACT_APP_API_URL + '/transactions/collection/today' , {headers : {'Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
      if(e.status === 200){
        settotal_collection(e.data.total_fare)
        axios.get(process.env.REACT_APP_API_URL + '/hino/unit/all' , {headers : {'Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
          if(e.status === 200){
            settotal_unit(e.data.units)
            return setisLoading(false)
          }
        })
      }
    }).catch(error =>{
      console.log(error)
      if(axios.isCancel(error)){
          alert(`[status: ${error.response.status} ] Error while sending your request please try again later.`)
          return setisLoading(false)
      }
  })
  
   
  }, []);

  


  return (
   <AdminNav>
    {
      !isLoading ? 
        <>
          <Link to={'/admin/collection'} className='col-xl-4 btn bg-gui p-3 border-rounded'>
            <div className='container'>
              <h5 className='text-start'>● Total Collection</h5>
              <div className='d-flex flex-row align-items-center'>
                <img className='icon-primary' src='/imgs/collection.png' alt=''/>
                <div><p><span className='fc-primary-logo'>CB-Transco</span> Today Total Collection : <br/> </p> <h2><b> ₱ {total_collection || 0}</b></h2></div>
              </div>
            
            </div>
          </Link> 

          <Link to={'/admin/hino'} className='col-xl-4 btn bg-gui p-3 border-rounded'>
            <div className='container'>
              <h5 className='text-start'>● Total Units</h5>
              <div className='d-flex flex-row align-items-center'>
                <img className='icon-primary' src='/imgs/bus.png' alt=''/>
                <div><p><span className='fc-primary-logo'>CB-Transco</span> Modern Jeep total units. <br/></p> <h2><b>{total_unit || 0}</b></h2></div>
              </div>
            </div>
          </Link>
        </>
      : <Loading/>
    }
      
   </AdminNav>
  )
}

export default AdminHome