import React from 'react'
import AdminNav from './Components/AdminNav'
import { useState , useEffect } from 'react'
import Loading from '../Components/Loading';
import axios from 'axios';
import Cookies from 'js-cookie';
function AdminDailyCollection() {

    const [collection, setcollection] = useState([]);

    const [isLoading, setisLoading] = useState(false);



    useEffect(() => {
        setisLoading(true)
        axios.get(process.env.REACT_APP_API_URL + '/transactions/collection/all' , {headers : {"ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json','Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
        console.log(e.data)
        if(e.status === 200){
                setcollection(e.data)
                return setisLoading(false)
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
                    <div className='col-xl-4 col-12'>
                        <div className='d-flex flex-row align-items-center mt-2 mb-2'>
                            <img className='icon-primary' src='/imgs/collection.png' alt='bus'/>
                            <div>
                                <h4>CB-Transco</h4>
                                <h3 className='fc-primary-logo'>Daily Collection</h3>
                            </div>
                        </div>
                        <br/>
                        {
                            collection.map((collection , index)=>{
                                return (
                                    <div key={index} className='bg-gui p-3 mt-2 mb-2 border-rounded d-flex flex-row gap-2 align-items-center'>
                                        <img className='icon-small' src='/imgs/collection.png' alt='collection'/>
                                        <p>Date : <b>{collection.date}</b> <br/> Total Collection: <h5><b>₱ {collection.total_fare}</b></h5></p>
                                    </div>
                                )
                            })
                        }
                    </div>
                : <Loading/> 
            }
        </AdminNav>
    )
}

export default AdminDailyCollection