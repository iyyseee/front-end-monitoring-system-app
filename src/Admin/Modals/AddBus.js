import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react'
import { useState , useEffect} from 'react'

function AddBus({setisOpen}) {


  const [hino, sethino] = useState('');
  const [isHino, setisHino] = useState(false);

  const addHino = () =>{
    if(hino.length === 0) return setisHino(true)
    axios.post(process.env.REACT_APP_API_URL + '/hino', {name : hino} , {headers : {'Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
      if(e.status === 200){
        setisOpen(false)
        return window.location.reload()
      }
    }).catch(error =>{
      console.log(error)
      if(axios.isCancel(error)){
        return alert(`[status: ${error.response.status} ]An error while processing your request.`)
      }
  })
  }

  useEffect(() => {
    setisHino(false)
  }, [hino]);


  return (
    <div className='d-flex justify-content-center'>
        <input className={!isHino ? 'input-primary' : 'input-primary error s-1'} placeholder='Name' onChange={e => sethino(e.target.value)} value={hino}/>
        <div className='d-flex flex-row justify-content-center justify-self-end fixed-bottom w-100 p-2 gap-5'>
            <button onClick={()=> setisOpen(false)} className='btn-secondary'>Back</button>
            <button onClick={addHino} type='submit' className='btn-primary'>Add</button>
        </div>
    </div>
  )
}

export default AddBus