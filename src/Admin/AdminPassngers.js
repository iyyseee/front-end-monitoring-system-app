import React from 'react'
import AdminNav from './Components/AdminNav'
import { useState , useEffect } from 'react'
import Loading from '../Components/Loading';
import axios from 'axios';
import Cookies from 'js-cookie';

function AdminPassngers() {

    const [passengers, setpassengers] = useState([]);

    const [isLoading, setisLoading] = useState(false);


    useEffect(() => {
        setisLoading(true)
        axios.get(process.env.REACT_APP_API_URL + '/passengers' , {headers : {'Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
            if(e.status === 200){
                setpassengers(e.data)
                return setisLoading(false)
            }
        }).catch(error =>{
            console.log(error)
            if(axios.isCancel(error)){
                return alert(`[status: ${error.response.status} ]An error while processing your request.`)
            }
        })
       
    }, []);

    return (
        <AdminNav>
           {!isLoading ?
                
                <>
                <h4>Passengers Logs</h4>
                <div className='col-xl-4 col-12'>
                    {
                        passengers.map((passenger , index)=>{
                            return (
        
                                <div key={index} className='bg-gui d-flex flex-row mt-2 p-3 align-items-center justify-content-between gap-5 border-rounded'>
                                    <img className='icon-primary' src='/imgs/passenger.png' alt='passenger'/>
                                    <p>
                                        <b>Passenger : </b> {passenger.type} <br/>
                                        <b>Destination :</b> {passenger.destination} <br/>
                                        <b>Origin : </b> {passenger.origin} <br/>
                                        <b>Bus : </b> {passenger.name} <br/>
                                        <b>Date & Time : </b> {passenger.date_time}
                                    </p>
                                </div>
                            )
                        })
                    }
                    <br/>
                    <br/>
                </div>
                
                </>
           : <Loading/>}
        </AdminNav>
    )
}

export default AdminPassngers