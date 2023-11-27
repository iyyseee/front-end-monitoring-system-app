import React from 'react'
import Dashboard from '../Components/Dashboard'
import { useState } from 'react';
function Checking() {

    const [origin, setorigin] = useState([ 'Butuan' , 'Cabadbaran']);

    const [hino, sethino] = useState(['Hino 1' , 'Hino 2']);

  return (
    <Dashboard>
        <h5><b>Checking</b></h5>
        <img className='icon-primary' src='/imgs/bus.png' alt=''/>
        <select name='origin' className='input-primary s-1'>
            {hino.map((hino , index)=>{
                return (
                    <option key={index}>{hino}</option>
                )
            })}
        </select>
        <select name='origin' className='input-primary s-1'>
            {origin.map((org , index)=>{
                return (
                    <option key={index}>{org}</option>
                )
            })}
        </select>
        <button className='btn-primary'>Start</button>
    </Dashboard>
  )
}

export default Checking