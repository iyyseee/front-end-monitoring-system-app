import React from 'react'
import AdminNav from './Components/AdminNav'
import { useState , useEffect } from 'react'
import Loading from '../Components/Loading';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function AdminDestinationByID() {

    const navigate = useNavigate()

    const params = useParams()

    const [destination, setdestination] = useState({});


    const [isEditMode, setisEditMode] = useState(false);

    const [isLoading, setisLoading] = useState(false);

    const deleteDestination = () =>{
        setisLoading(true)
        axios.delete(process.env.REACT_APP_API_URL + '/destinations/'+ destination.id, {headers : {'Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
            if(e.status === 200){
                setisLoading(false)
                return navigate('/admin/destinations')
            }
        }).catch(error => {
            if(axios.isCancel(error)){
                alert(`[status: ${error.response.status} ]An error while processing your request.`)
                return setisLoading(false)
            }
        }) 
    }


    const updateDestination = () =>{
        setisLoading(true)
        axios.put(process.env.REACT_APP_API_URL + '/destinations/'+ destination.id , 
        {origin : destination.origin , destination : destination.destination} , 
        {headers : {"ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json','Authorization' : 'Bearer ' + Cookies.get('admin_token') }}).then(e=>{
            console.log(e.data)
            if(e.status === 200){
                axios.put(process.env.REACT_APP_API_URL + `/fare/${destination.id}/regular` , 
                {fare : destination.regular}, 
                {headers : {"ngrok-skip-browser-warning": "69420",
                'Content-Type': 'application/json','Authorization' : 'Bearer ' + Cookies.get('admin_token')}} ).then(e=>{
                    if(e.status === 200){
                        console.log(e.data)
                        axios.put(process.env.REACT_APP_API_URL + `/fare/${destination.id}/sp` , 
                        {fare : destination.sp}, 
                        {headers : {"ngrok-skip-browser-warning": "69420",
                        'Content-Type': 'application/json','Authorization' : 'Bearer ' + Cookies.get('admin_token')}} ).then(e=>{
                            if(e.status === 200){
                                console.log(e.data)
                                return window.location.reload()
                            }
                        }).catch(error => {
                            if(axios.isCancel(error)){
                                alert(`[status: ${error.response.status} ]An error while processing your request.`)
                                return setisLoading(false)
                            }
                        }) 
                    }
                }).catch(error => {
                    if(axios.isCancel(error)){
                        alert(`[status: ${error.response.status} ]An error while processing your request.`)
                        return setisLoading(false)
                    }
                })  
            }
        }).catch(error => {
            if(axios.isCancel(error)){
                alert(`[status: ${error.response.status} ]An error while processing your request.`)
                return setisLoading(false)
            }
        })
    }


    useEffect(() => {
        setisLoading(true)
        axios.get(process.env.REACT_APP_API_URL + '/destinations/' + params.id , {headers : {"ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json','Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
            
            if(e.data.length == 0){
                return navigate('/admin/destinations')
            }
            if(e.status === 200){
                setdestination(e.data)
                return setisLoading(false)
            }
            
        }).catch(error =>{
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
                    <div className='col-xl-4 col-12'>
                        <div className='d-flex flex-row align-items-center mt-2 mb-2'>
                        <img className='icon-primary' src='/imgs/destination.png' alt='destination_logo'/>
                            <div>
                                <h4>CB-Transco</h4>
                                <h3 className='fc-primary-logo'>Destinations</h3>
                            </div>
                        </div>
                        <br/>
                        <div>
                            <h5><b>Origin : </b>{isEditMode? <select  className='input-primary' onChange={e=> setdestination({...destination , origin : e.target.value})} value={destination.origin}><option value={'Butuan'}>Butuan</option><option value={'Cabadbaran'}>Cabadbaran</option></select> : destination.origin}</h5>
                            <h4><b>Destination : </b><span  className='fc-primary-logo'>{isEditMode ? <input type='text' className='fc-primary-logo input-primary' onChange={e=> setdestination({...destination , destination : e.target.value})} value={destination.destination}/> : destination.destination}</span></h4>
                            <h6><b>Regular Fare :</b>{ isEditMode? <input className='input-primary' onChange={e=>setdestination({...destination , regular : e.target.value})} value={destination.regular}/>: destination.regular}</h6>
                            <h6><b>Sp Fare :</b>{isEditMode? <input className='input-primary' onChange={e=>setdestination({...destination , sp : e.target.value})} value={destination.sp}/>:destination.sp}</h6>
                        </div>
                        <div className='d-flex flex-row justify-content-center gap-2'>
                            <button className='btn' onClick={()=> isEditMode ? setisEditMode(false) : setisEditMode(true)}>
                                {
                                    isEditMode ? 
                                        <img className='icon-small' src='/imgs/cancel.png' alt='cancel'/>
                                    :   <img className='icon-small' src='/imgs/edit.png' alt='edit'/>
                                }
                            </button>
                            {
                                isEditMode ? 
                                <button onClick={updateDestination} className='btn'><img className='icon-small' src='/imgs/save.png' alt='save'/></button>
                                :<></>
                            }
                            <button onClick={deleteDestination} className='btn'><img className='icon-small' src='/imgs/delete.png' alt='deleted'/></button>
                        </div>
                        <div className='fixed-bottom d-flex justify-content-center bg-white'>
                            <Link to={'/admin/destinations'} className='btn-primary border-rounded'>Back</Link>
                        </div>
                    </div>
                : <Loading/>
            }
        </AdminNav>
    )
}

export default AdminDestinationByID