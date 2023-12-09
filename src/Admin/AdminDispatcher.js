import React from 'react'
import AdminNav from './Components/AdminNav'
import { useState , useEffect } from 'react'
import Loading from '../Components/Loading';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import AddDispatcher from './Modals/AddDispatcher';

function AdminDispatcher() {

    const [isLoading, setisLoading] = useState(false);

    const [dispatchers, setdispatchers] = useState([]);

    const [isopenAddModal, setisopenAddModal] = useState(false);


    useEffect(() => {
        setisLoading(true)
        axios.get(process.env.REACT_APP_API_URL + '/users' , {headers : {'Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
            console.log(e.data)
            if(e.status === 200){
                setdispatchers(e.data)
                return setisLoading(false)
            }
        }).catch(error => {
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
                        <img className='icon-primary' src='/imgs/dispatcher.png' alt='destination_logo'/>
                            <div>
                                <h4>CB-Transco</h4>
                                <h3 className='fc-primary-logo'>Dispatcher List</h3>
                            </div>
                        </div>
                        <br/>
                        {
                            !isopenAddModal ?
                                <>
                                    {
                                        dispatchers.map((dispatcher , index)=>{
                                            return (
                                                <Link to={`/admin/dispatchers/${dispatcher.id}`} key={index} className='p-2 border-rounded bg-gui no-link d-flex flex-row align-items-center gap-2 mt-2 md-2'>
                                                    <img className='icon-secondary' src='/imgs/dispatcher.png' alt='destination'/>
                                                    <p>
                                                        <b>{dispatcher.first_name} {dispatcher.last_name}</b><br/>
                                                        <b>{dispatcher.email}</b> 
                                                    </p>
                                                </Link>
                                            )
                                        })
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
                            : <AddDispatcher setisOpen={setisopenAddModal} setisLoading={setisLoading} />
                        }
                    </div>
                : <Loading/>
            }
        </AdminNav>
    )
}

export default AdminDispatcher