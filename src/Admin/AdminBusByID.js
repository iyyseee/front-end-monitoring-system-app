import React from 'react'
import AdminNav from './Components/AdminNav'
import { useState , useEffect } from 'react'
import Loading from '../Components/Loading';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function AdminBusByID() {

    const params = useParams()

    const navigate = useNavigate()

    const [isLoading, setisLoading] = useState(false);
    const [bus, setbus] = useState({});
    const [transactions, settransactions] = useState([]);
    const [isEditMode, setisEditMode] = useState(false);


    const loadTransactions = () =>{
        setisLoading(true)
        axios.get(process.env.REACT_APP_API_URL  + '/hino/transactions/' + params.id , {headers : {"ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json','Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
            console.log(e.data)
            if(e.status === 200){
                settransactions(e.data)
                return setisLoading(false)
            }
        }).catch(error =>{
            console.log(error)
            if(axios.isCancel(error)){
              alert(`[status: ${error.response.status} ]An error while processing your request.`)
              return setisLoading(false)
            }
        })
    }

    const updateBus = () =>{
        setisLoading(true)
        axios.put(process.env.REACT_APP_API_URL + '/hino/' + params.id , {name: bus.name} , {headers : {"ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
            if(e.status === 200){
                return window.location.reload()
            }
        }).catch(error =>{
            console.log(error)
            if(axios.isCancel(error)){
              alert(`[status: ${error.response.status} ]An error while processing your request.`)
              return setisLoading(false)
            }
        })
    }

    const deleteBus = () =>{
        setisLoading(true)
        axios.delete(process.env.REACT_APP_API_URL + '/hino/' + params.id, {headers : {"ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
            if(e.status === 200){
                setisLoading(false)
                return navigate('/admin/hino')
            }
        }).catch(error =>{
            console.log(error)
            if(axios.isCancel(error)){
              alert(`[status: ${error.response.status} ]An error while processing your request.`)
              return setisLoading(false)
            }
        })
    }


    useEffect(() => {
        
        setisLoading(true)
        axios.get(process.env.REACT_APP_API_URL  + '/hino/' + params.id , {headers : {"ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json','Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
            if(e.status === 200){
                console.log(e.data)
                setbus(e.data)
                return loadTransactions()
            }
        }).catch(error =>{
            console.log(error)
            if(error.response.status === 404){
                return navigate('/admin/hino')
            }
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
                            <img className='icon-primary' src='/imgs/bus.png' alt='bus'/>
                            <div>
                                <h4>CB-Transco</h4>
                                <h3 className='fc-primary-logo'>Jeep Transaction List</h3>
                            </div>
                        </div>
                        {isEditMode ? <input className='input-primary w-100' onChange={e=> setbus({...bus , name :e.target.value})}  value={bus.name}/> :  <h3 className='text-center'><b>{bus.name}</b></h3>}
                       
                        <div className='d-flex flex-row justify-content-center'>
                            <button onClick={()=>!isEditMode ? setisEditMode(true) : setisEditMode(false)} className='btn'>
                                {
                                    isEditMode ? 
                                        <img className='icon-small' src='/imgs/cancel.png' alt='close'/>
                                    :   <img className='icon-small' src='/imgs/rename.png' alt='rename'/>
                                }
                                
                            </button>
                            {isEditMode ? <button onClick={updateBus} className='btn'><img className='icon-small' src='/imgs/save.png' alt='save'/></button> : <></>}
                            <button onClick={deleteBus} className='btn'><img className='icon-small' src='/imgs/delete.png' alt='deleted'/></button>
                        </div>
                        <br/>
                        <p><b>Daily Transactions</b></p>
                        {
                            (transactions.length != 0) ? 
                            transactions.map((transaction , index)=>{
                                return (
                                    <div key={index} className='bg-gui p-3 mt-2 md-2 border-rounded'>
                                        <p className='text-small'>{transaction.trip_date}</p>
                                        <div className='d-flex flex-row gap-2'>
                                            <img className='icon-small' src='/imgs/distance.png' alt='location'/>
                                            <p>
                                                <b>Trip : </b>{transaction.total_trips} <br/>
                                                <b>Total Passengers : </b>{transaction.total_pass} <br/>
                                                <b>Total Collection : </b>₱{transaction.total_collection}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                            : <p className='text-center text-small'>No Available Transactions</p>
                        }
                    </div>
                : <Loading/>
            }
        </AdminNav>
    )
}

export default AdminBusByID