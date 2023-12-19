import React from 'react'
import AdminNav from './Components/AdminNav'
import { useEffect, useState } from 'react'
import Loading from '../Components/Loading';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import AddDestination from './Modals/AddDestination';
function AdminDestination() {

    const [isLoading, setisLoading] = useState(false);

    const [destinations, setdestinations] = useState([]);

    const [isopenAddModal, setisopenAddModal] = useState(false);

    useEffect(() => {
        setisLoading(true)
        axios.get(process.env.REACT_APP_API_URL + '/destinations', {headers : {"ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json','Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
            if(e.status === 200){
                setdestinations(e.data)
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
                    <>
                        <div className='d-flex flex-row align-items-center mt-2 mb-2'>
                        <img className='icon-primary' src='/imgs/destination.png' alt='destination_logo'/>
                            <div>
                                <h4>CB-Transco</h4>
                                <h3 className='fc-primary-logo'>Destinations</h3>
                            </div>
                        </div>
                        <br/>
                        {
                            !isopenAddModal ? 
                                <>
                                    {
                                        destinations.map(((destination , index) =>{
                                            return (
                                                <Link to={`/admin/destinations/${destination.id}`} key={index} className='col-xl-4 col-12 p-2 border-rounded bg-gui no-link d-flex flex-row align-items-center gap-2'>
                                                    <img className='icon-secondary' src='/imgs/destination.png' alt='destination'/>
                                                    <p>
                                                        <b>Origin : </b> {destination.origin} <br/>
                                                        <b>Destination : </b> {destination.destination}
                                                    </p>
                                                </Link>
                                            )
                                        }))
                                    }
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <div className='fixed-bottom d-flex justify-content-center bg-white'>
                                        <button onClick={()=> setisopenAddModal(true)} className='btn-primary btn-round'>+</button>
                                    </div>
                                </>

                            : <AddDestination isLoading={isLoading} setisLoading={setisLoading} setopenAddModal={setisopenAddModal}/>
                        }
                    </>
                : <Loading/>
            }


        </AdminNav>
    )
}

export default AdminDestination