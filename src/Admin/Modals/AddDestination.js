import axios from 'axios'
import Cookies from 'js-cookie';
import React from 'react'
import { useState , useEffect } from 'react'


function AddDestination({isLoading , setisLoading , setopenAddModal}) {

    const origin = ['Butuan' , ' Cabadbaran']

    const [destination, setdestination] = useState({
        origin : origin[0],
        destination : '',
        regular_fare : 0,
        sp_fare : 0
    });

    const AddDestination = () =>{
        setisLoading(true)
        axios.post(process.env.REACT_APP_API_URL + '/destinations' , 
        {origin : destination.origin , destination : destination.destination} , 
        {headers : {'Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
            if(e.status === 200){
                console.log(e.data)
                axios.post(process.env.REACT_APP_API_URL + '/fare' ,
                {type : 'sp' , fare : destination.sp_fare , destination_id : e.data.destination.id} , 
                {headers : {'Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
                    console.log(e.data)
                    if(e.status === 200){
                    }
                })
                axios.post(process.env.REACT_APP_API_URL + '/fare' , 
                {type : 'regular' , fare : destination.regular_fare , destination_id : e.data.destination.id} , 
                {headers : {'Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
                    console.log(e.data)
                    if(e.status === 200) {
                        setopenAddModal(false)
                        setisLoading(false)
                        return window.location.reload()
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



    return (
        <div className='d-flex flex-column'>
            <select className='input-primary s-1' onChange={e => setdestination({...destination , origin : e.target.value})}>
                {
                    origin.map((origin , index)=>{
                        return <option key={index} value={origin}>{origin}</option>
                    })
                }
            </select>
            <input className='input-primary s-1' type='text' placeholder='Destination'  onChange={e => setdestination({...destination , destination : e.target.value})} value={destination.destination}/>
            <label htmlFor='regular_fare'>Regular Fare</label>
            <input id='regular_fare' className='input-primary s-1' type='number' placeholder='Regular Fare' onChange={e => setdestination({...destination , regular_fare : e.target.value})} value={destination.regular_fare}/>
            <label htmlFor='sp_fare'>Sp Fare</label>
            <input id='sp_fare' className='input-primary s-1' type='number' placeholder='Sp Fare' onChange={e => setdestination({...destination , sp_fare : e.target.value})} value={destination.sp_fare}/>
            <div className='d-flex flex-row justify-content-center justify-self-end fixed-bottom w-100 p-2 gap-5'>
                  <button onClick={()=> setopenAddModal(false)} className='btn-secondary'>Back</button>
                  <button onClick={AddDestination} className='btn-primary'>Add</button>
                </div>
        </div>
    )
}

export default AddDestination