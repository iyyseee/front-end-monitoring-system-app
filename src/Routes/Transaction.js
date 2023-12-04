import React, { useEffect, useState } from 'react'
import Dashboard from '../Components/Dashboard'
import axios from 'axios';
import Cookies from 'js-cookie';
import Loading from '../Components/Loading';

function Transaction() {

  const [transactions, settransactions] = useState([]);

  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true)
    axios.get(process.env.REACT_APP_API_URL + '/transactions', {headers : {'Authorization' : 'Bearer ' + Cookies.get('token')}}).then(e=>{
      console.log(e.data)
      settransactions(e.data)
      setisLoading(false)
    })
    
  }, []);


  return (
    <Dashboard>
        {!isLoading ? 
          <div className='col-xl-4 col-12'>
          {transactions.map((transaction , index)=>{
            return (
              <a href={`/transaction/${transaction.id}`} key={index} className='bg-gui p-3 rounded d-flex flex-row justify-content-between align-items-center no-link mt-2' >
                <div className='d-flex flex-row'>
                  <img className='icon-small' src='/imgs/transaction.png' alt='transaction'/>
                  <p>{transaction.name}<br/>Origin: {transaction.origin}</p>
                </div>
                <p className='text-end'>{transaction.date}<br/>{transaction.time}</p>
              </a>
            )
          })}
          </div>
        : <Loading/>}
    </Dashboard>
  )
}

export default Transaction