import React from 'react'
import Dashboard from '../Components/Dashboard'
import { useState , useEffect } from 'react'
import Loading from '../Components/Loading';
import axios from 'axios';
import Cookies from 'js-cookie';
function Hino() {

  

  const [isLoading, setisLoading] = useState(false);

  const [hinos, sethinos] = useState([]);

  useEffect(() => {
    setisLoading(true)
    axios.get(process.env.REACT_APP_API_URL+'/hino' , {headers : {'Authorization' : 'Bearer ' + Cookies.get('token')}}).then(e=>{
      sethinos(e.data)
      return setisLoading(false)
    }).catch(error =>{
      console.log(error)
      if(axios.isCancel(error)){
          alert(`[status: ${error.response.status} ] Error while sending your request please try again later.`)
          return setisLoading(false)
      }
    })
    
  }, []);


  return (
    <Dashboard>
        {!isLoading ?
          <>
            <div className='col-xl-4 col-12'>
              <h4>Today</h4>
              {hinos.map((hino , index)=>{
                return (
                    <div key={index} className='bg-gui mt-2 p-2 rounded d-flex flex-row align-items-center justify-content-between'>
                      <div className='d-flex flex-row align-items-center'>
                        <img className='icon-primary' src='/imgs/bus.png' alt='bus'/>
                        <p>Hino: {hino.name} <br/>Trip : {hino.trip}</p>
                      </div>
                      <a href={`/hino/${hino.id}`} className='btn-primary'>View</a>
                    </div>
                )

              })}

            </div>
          </>
        : <Loading/>}
    </Dashboard>
  )
}

export default Hino