import React from 'react'
import AdminNav from './Components/AdminNav'
import { useState , useEffect } from 'react'
import Loading from '../Components/Loading';
import axios from 'axios';
import Cookies from 'js-cookie';
function AdminTransactions() {

    const [isLoading, setisLoading] = useState(false);
    const [transactions, settransactions] = useState([]);

    useEffect(() => {
        setisLoading(true)
        axios.get(process.env.REACT_APP_API_URL + '/transactions/all', {headers : {"ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json','Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
          console.log(e.data)
          settransactions(e.data)
          setisLoading(false)
        })
        
      }, []);

    return (
        <AdminNav>
            {!isLoading ? 
          <div className='col-xl-4 col-12'>
          {transactions.map((transaction , index)=>{
            return (
              <a href={`/admin/transactions/${transaction.id}`} key={index} className='bg-gui p-3 rounded d-flex flex-row justify-content-between align-items-center no-link mt-2' >
                <div className='d-flex flex-row'>
                  <img className='icon-small' src='/imgs/transaction.png' alt='transaction'/>
                  <p className='text-small'>
                    {transaction.name}<br/>
                    Origin: {transaction.origin}<br/>  
                    Dispatcher {transaction.full_name}   
                </p>
                </div>
                <p className='text-end text-small'>{transaction.date_time}</p>
              </a>
            )
          })}
          </div>
        : <Loading/>}
        { !isLoading ? (transactions.length === 0) ? <p>No Transactions Available.</p>: <></> : <></>}
        </AdminNav>
    )
}

export default AdminTransactions