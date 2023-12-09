import React from 'react'
import { useState , useEffect } from 'react'
import { Link, json, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import axios from 'axios';
import Cookies from 'js-cookie';
import AdminNav from './Components/AdminNav';

function AdminHome() {

  


  return (
   <AdminNav>
      <Link to={''} className='col-xl-4 btn bg-gui p-3 border-rounded'>
          <div className='container'>
            <h5 className='text-start'>● Liquidate</h5>
            <div className='d-flex flex-row align-items-center'>
              <img className='icon-primary' src='/imgs/liquidate.png' alt=''/>
              <p><span className='fc-primary-logo'>CB-Transco</span> Transaction Liquidation. Start Liquidating Now.</p>
            </div>
          </div>
        </Link>

        <Link to={''} className='col-xl-4 btn bg-gui p-3 border-rounded'>
          <div className='container'>
            <h5 className='text-start'>● Liquidations</h5>
            <div className='d-flex flex-row align-items-center'>
              <img className='icon-primary' src='/imgs/transaction.png' alt=''/>
              <p><span className='fc-primary-logo'>CB-Transco</span> Liquidations. View all Liquidated Transactions.</p>
            </div>
          </div>
        </Link>
   </AdminNav>
  )
}

export default AdminHome