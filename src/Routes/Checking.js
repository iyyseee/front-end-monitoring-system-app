import React from 'react'
import Dashboard from '../Components/Dashboard'
import { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loading from '../Components/Loading';
function Checking() {

    /* navigations */

    const navigate = useNavigate()


    /* loaded data */
    const [origin, setorigin] = useState([ 'Butuan' , 'Cabadbaran']);
    const [hino, sethino] = useState([]);


    /* selected data */
    const [selectedData, setselectedData] = useState({
        bus_id : '',
        origin : origin[0]
    });

    /* loaders */
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        
        setisLoading(true)
        axios.get(process.env.REACT_APP_API_URL + '/hino', { headers : { 'Authorization' : 'Bearer ' + Cookies.get('token')}}).then( e =>{
            setselectedData({...selectedData , bus_id : e.data[0].id})
            sethino(e.data)
            setisLoading(false)
        }).catch(error => {
            console.log(error)
            alert('Network Error!!')
        })


    
        
    }, []);


    const start =() =>{
        console.log('Hino : ' ,selectedData )
        setisLoading(true)
        axios.post(process.env.REACT_APP_API_URL + '/transactions',
        //fetch body
        selectedData , 
        { headers : { 'Authorization' : 'Bearer ' + Cookies.get('token')}}).then(e=>{
            console.log(e.data)
            setisLoading(false)
            navigate(`/checking/${e.data.transaction.id}`)
        })
        


    }



  return (
    <Dashboard>
        {isLoading ? <Loading /> : 
        <>
            <h5><b>Checking</b></h5>
            <img className='icon-primary' src='/imgs/bus.png' alt=''/>
            <select name='origin' className='input-primary s-1' onChange={e=> setselectedData({...selectedData , bus_id : e.target.value})}>
                {hino.map((hino , index)=>{
                    return (
                        <option key={index} value={hino.id}>{hino.name}</option>
                    )
                })}
            </select>
            <select name='origin' className='input-primary s-1' onChange={e=> setselectedData({...selectedData , origin : e.target.value})}>
                {origin.map((org , index)=>{
                    return (
                        <option key={index} value={org}>{org}</option>
                    )
                })}
            </select>
            <div className='d-flex flex-row gap-2'>
                <button onClick={()=> navigate('/')} className='btn-back'>Back</button>
                <button onClick={start} className='btn-primary'>Start</button>
            </div>
        </>
        }
    </Dashboard>
  )
}

export default Checking