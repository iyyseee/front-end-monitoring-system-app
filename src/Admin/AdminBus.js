import React from 'react'
import AdminNav from './Components/AdminNav'
import Loading from '../Components/Loading';
import { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import AddBus from './Modals/AddBus';

function AdminBus() {

  const [bus, setbus] = useState([]);

  const [isLoading, setisLoading] = useState(false);

  const [isopenModal, setisopenModal] = useState(false);

  useEffect(() => {
    setisLoading(true)
    axios.get(process.env.REACT_APP_API_URL  + '/hino' , {headers : {"ngrok-skip-browser-warning": "69420",
    'Content-Type': 'application/json','Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
      console.log(e.data)
      if(e.status === 200){
        setbus(e.data)
        return setisLoading(false)
      }
    }).catch(error =>{
      console.log(error)
      if(axios.isCancel(error)){
        alert(`[status: ${error.response.status} ]An error while processing your request.`)
        return setisLoading(false)
      }
    })
  
 
  }, []);

  return (
    <AdminNav>
      {
        !isLoading ?
          <>
           <div className='col-xl-4 col-12'>
              <div className='d-flex flex-row align-items-center mt-2 mb-2'>
              <img className='icon-primary' src='/imgs/bus.png' alt='bus'/>
                  <div>
                      <h4>CB-Transco</h4>
                      <h3 className='fc-primary-logo'>Jeep List</h3>
                  </div>
              </div>
              <br/>
            {
              !isopenModal ? 
                <>   
                      {
                        bus.map((bus , index)=>{
                          return (
                              <div key={index} className='bg-gui mt-2 p-2 rounded d-flex flex-row align-items-center justify-content-between'>
                                <div className='d-flex flex-row align-items-center'>
                                  <img className='icon-secondary' src='/imgs/bus.png' alt='bus'/>
                                  <p>{bus.name} <br/>Today Trip : {bus.trip}</p>
                                </div>
                                <a href={`/admin/hino/${bus.id}`} className='btn-primary'>View</a>
                              </div>
                            )
                        })
                      }
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <div className='fixed-bottom d-flex justify-content-center bg-white'>
                          <button onClick={()=> setisopenModal(true)} className='btn-primary btn-round'>+</button>
                      </div>
                </>
              : <AddBus setisOpen={setisopenModal}/>
            }  
            </div>
          </>        
        : <Loading/>
      }
    </AdminNav>
  )
}

export default AdminBus