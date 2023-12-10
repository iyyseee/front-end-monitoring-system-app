import React from 'react'
import { useState, useEffect } from 'react'
import Loading from '../Components/Loading';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import AdminNav from './Components/AdminNav';
function AdminTransactionByID() {

    const id = useParams()

    const [isLoading, setisLoading] = useState(false);

    const [transaction, settransaction] = useState({});

    useEffect(() => {
        setisLoading(true)
        axios.get(process.env.REACT_APP_API_URL + '/transactions/' + id.id , {headers : { 'Authorization' : 'Bearer ' + Cookies.get('admin_token') }} ).then(e=>{
            if(e.status === 200){
                settransaction(e.data[0])
                console.log(e.data)
                setisLoading(false)
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
            {!isLoading ? 
                <>
                    <div className='col-xl-4 col-12'>
                        <div className='d-flex flex-row'>
                            <img className='icon-primary' src='/imgs/record.png' alt=''/>
                            <div>
                                <h4><b>Transaction</b></h4>
                                <p>Hino: {transaction.name}</p>
                                <p>Date: {transaction.date_time}</p>
                                <p>Origin: {transaction.origin}</p>
                            </div>
                        </div>
                        <h4><b>Total Passenger : {transaction.total_passengers}</b></h4>
                        <p>Regular : {transaction.regular}</p>
                        <p>Sp : {transaction.sp}</p>
                        <p>Total Collection : ₱{transaction.total_collection}</p>
                        <br/>
                        <h5><b>Dispatch by: {transaction.dis_name} </b></h5>
                        <div className='fixed-bottom m-3 d-flex justify-content-center'>
                            <a href='/admin/transactions' className='btn-primary'>Close</a>
                        </div>
                    </div>
                </> 
            : <Loading/>}
        </AdminNav>
    )
}

export default AdminTransactionByID