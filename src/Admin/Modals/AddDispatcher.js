import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';

function AddDispatcher({setisOpen , setisLoading}) {

    const [isEmail, setisEmail] = useState(false);

    const [isPassword, setisPassword] = useState(false);

    const [isFname, setisFname] = useState(false);

    const [isMname, setisMname] = useState(false);

    const [isLname, setisLname] = useState(false);

    const [showPass, setshowPass] = useState(false);

    const [inputs, setinputs] = useState({
        email : '',
        password : '',
        first_name : '',
        middle_name : '',
        last_name : ''
    });


    const handdlesubmit = e =>{
        e.preventDefault()
        if(inputs.email.length === 0) return setisEmail(true)
        if(inputs.first_name.length === 0) return setisFname(true)
        if(inputs.middle_name.length === 0) return setisMname(true)
        if(inputs.last_name.length === 0) return setisLname(true)
        if(inputs.password.length === 0) return setisPassword(true)

        axios.post(process.env.REACT_APP_API_URL + '/register'  , inputs).then(e=>{
            console.log(e)
            if(e.status === 201 ) return window.location.reload()
          }).catch(error =>{
            if(error.response.status === 422){
              console.log()
              setisEmail(true)
              setisPassword(true)
              setisLoading(false)
            }
        })
    }

    useEffect(() => {
        setisEmail(false)
        setisPassword(false)
        setisFname(false)
        setisMname(false)
        setisLname(false)
    }, [inputs]);


    return (
        <>
            <form onSubmit={handdlesubmit} className='d-flex flex-column align-items-center justify-content-center'>
            <input className={isEmail ? 'input-primary error s-1' : 'input-primary s-1'} type='email' placeholder='email' value={inputs.email} onChange={e=>setinputs({...inputs , email : e.target.value})} />
            <input className={isFname ? 'input-primary error s-1' : 'input-primary s-1'} type='text' placeholder='first name' value={inputs.first_name} onChange={e=>setinputs({...inputs , first_name : e.target.value})} />
            <input className={isMname ? 'input-primary error s-1' : 'input-primary s-1'} type='text' placeholder='middle name' value={inputs.middle_name} onChange={e=>setinputs({...inputs , middle_name : e.target.value})} />
            <input className={isLname ? 'input-primary error s-1' : 'input-primary s-1'} type='text' placeholder='last name'  value={inputs.last_name} onChange={e=>setinputs({...inputs , last_name : e.target.value})} />
            <input className={isPassword ? 'input-primary error s-1' : 'input-primary s-1'} type={showPass ? 'text' : 'password'} placeholder='password' value={inputs.password} onChange={e=>setinputs({...inputs , password : e.target.value})} />
            <div className='d-flex flex-row gap-2'>
              <input onClick={() => showPass ? setshowPass(false) : setshowPass(true)} type='checkbox' id='showpass' />
              <label htmlFor='showpass'>Show password</label>
            </div>
            <div className='d-flex flex-row justify-content-center justify-self-end fixed-bottom w-100 p-2 gap-5'>
                <button onClick={()=> setisOpen(false)} className='btn-secondary'>Back</button>
                <button type='submit' className='btn-primary'>Register</button>
            </div>
            
          </form>
        </>
        
    )
}

export default AddDispatcher