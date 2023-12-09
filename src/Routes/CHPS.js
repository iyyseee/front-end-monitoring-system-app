import React, { useEffect, useState } from 'react'
import Dashboard from '../Components/Dashboard'
import { useParams , useNavigate } from 'react-router-dom'
import Loading from '../Components/Loading';
import axios from 'axios';
import Cookies from 'js-cookie';
import CancelModal from '../Components/Modals/CancelModal';
import SubmitModal from '../Components/Modals/SubmitModal';
function CHPS() {

  const navigate = useNavigate()


  /* URL PARAMERT ID  */
  const id = useParams()

  /* sates  */
  const [isLoading, setisLoading] = useState(false);
  const [isFare, setisFare] = useState(false);
  const [isAddPassenger, setisAddPassenger] = useState(false);
  const [isCancelModal, setisCancelModal] = useState(false);
  const [isSubmitModal, setisSubmitModal] = useState(false);

  /* transaction details  */
  const [transaction, settransaction] = useState({});
  /* destinations  */
  const [destinations, setdestinations] = useState([]);
  /* passenger destination */
  const [pass_dest, setpass_dest] = useState({});
  /* passengers array */
  const [passengers, setpassengers] = useState([]);


  /* load destinations */
  const loadDestinations = (type) => {
    setisLoading(true)
    axios.get(process.env.REACT_APP_API_URL + `/destinations/${transaction.origin}/${type}`, {headers : {'Authorization' : 'Bearer ' + Cookies.get('token')}}).then(e=>{
      console.log(e.data)
      setpass_dest({ type: type , des_id : e.data[0].destination_id, des_name : e.data[0].destination  , fare : e.data[0].fare})
      setdestinations(e.data)
      return setisLoading(false)
    }).catch(error =>{
      console.log(error)
      if(axios.isCancel(error)){
        alert(`[status: ${error.response.status} ] Error while sending your request please try again later.`)
        return setisLoading(false)
      }
    })
  }

  /* set the fare of a passenger */
  const getFare = (des_id) =>{
    setisFare(true)
    destinations.forEach((des)=>{
      if(des.destination_id == des_id){
        setisFare(false)
        return setpass_dest({...pass_dest , des_id : des.destination_id, des_name : des.destination , fare : des.fare})
      }
    })
  }

  /* add passenger to the passengers array */
  const addPass =() =>{
    setisLoading(true)
    setisAddPassenger(false)
    setTimeout(()=>{
      setpassengers(prev => [...prev , pass_dest])
      return setisLoading(false)
    },1000)
  }


  /* delete a passenger from the passngers array  */
  const deletePassenger = (pass) =>{

    const newPassngers = passengers.filter(passengers => passengers !== pass)
    return setpassengers(newPassngers)
  }

  /* cancel the checking and send back to the /checking route  */
  const cancelChecking = () =>{
    setisLoading(true)
    axios.delete(process.env.REACT_APP_API_URL + '/transactions/' + id.id , {headers : {'Authorization' : 'Bearer ' + Cookies.get('token')}}).then(e=>{
      if(e.data.message === 'successfully deleted.'){
        navigate('/checking')
        return setisLoading(false)
      }
    }).catch(error=>{
      console.log(error)
      alert(`[status: ${error.response.status} ]An error while processing your request.`)
      navigate('/checking')
      return setisLoading(false)
    })
  }


  /* submit the checking */
  const submitCheking = () =>{
    setisLoading(true)
    passengers.map((pass)=>{
      const data = {
        transaction_id : id.id,
        destination_id : pass.des_id,
        type: pass.type
      }
      return axios.post(
        process.env.REACT_APP_API_URL + '/passengers',
        data ,
        {headers : {'Authorization' : 'Bearer ' + Cookies.get('token')}}
      ).then(e=>{
        if(e.data.message === 'successfully created'){
          navigate('/transaction/' + id.id)
          return setisLoading(false)
        } 
      }).catch(error =>{
        console.log(error)
        axios.isCancel(error)
        alert(`[status: ${error.response.status} ] Error while sending your request please try again later.`)
        return setisLoading(false)
      })
    })
  }

  
  

  /* validate the transaction id */
  useEffect(() => {
    setisLoading(true)
    axios.get(process.env.REACT_APP_API_URL + `/transactions/bus/${id.id}` , {headers : {'Authorization' : 'Bearer ' + Cookies.get('token')}}).then(e=>{
      console.log(e.data)
      settransaction(e.data)
      setisLoading(false)
    }).catch(error=>{
      console.log(error)
      alert(`[status: ${error.response.status} ]An error while processing your request.`)
    })
  }, []);


  return (
    <Dashboard>
      {!isLoading ?
        <>
          {!isAddPassenger?
            <>
              <div className='col-xl-4 col-12'>
                <div className='d-flex flex-row align-items-center'>
                  <img className='icon-primary' src='/imgs/bus.png' alt='bus'/>
                  <div className='d-flex flex-column'>
                    <h4>{transaction.name}</h4>
                    <h2 className='fc-primary-logo'>{transaction.origin} </h2>
                  </div>
                </div>
                <div>
                  <p><b>Total Passenger : {passengers.length}</b></p>
                  <div className='scroll'>
                    {passengers.map((pass , index)=>{
                      return (
                        <div key={index} className='passenger'>
                          <div className='d-flex flex-row'>
                            <img className='icon-small' src='/imgs/passenger.png' alt='passenger'/>
                            <p className='mt-auto fw-bold'>Destination : {pass.des_name}<br/>Passenger : {pass.type}</p>
                          </div>
                          <button onClick={()=> deletePassenger(pass)} className='btn'><img className='navs-icon' src='/imgs/delete.png' alt='delete'/></button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className='d-flex flex-row justify-content-center justify-self-end fixed-bottom w-100 gap-5 bg-white'>
                <button onClick={()=>setisCancelModal(true)} className='btn'><b>Back</b></button>
                <button onClick={()=> {
                  setisAddPassenger(true)
                  loadDestinations('regular')
                }} className='btn-primary btn-round'>+</button>
                <button onClick={()=> setisSubmitModal(true)} className='btn'><b>Submit</b></button>
              </div>
              <CancelModal isOpen={isCancelModal} setIsOpen={setisCancelModal} cancel={cancelChecking} />
              <SubmitModal isOpen={isSubmitModal} setIsOpen={setisSubmitModal} submit={submitCheking}/>
            </> 
          :
            <>
              <div className='col-xl-4 d-flex flex-column justify-content-center align-items-center'>
                <img className='icon-primary m-auto' src='/imgs/passenger.png' alt='passenger'/>
                <br/>
                <select  name='passenger' className='input-primary s-1' defaultValue={pass_dest.type} onChange={e=>loadDestinations(e.target.value)}>
                <option value={'regular'}>Regular</option>
                <option value={'sp'}>Special Passenger</option>
                </select>
                <select name='destination' className='input-primary s-1' onChange={e=>getFare(e.target.value)}>
                {destinations.map((destinations , index)=>{
                    return (
                        <option key={index} value={destinations.destination_id}>{destinations.destination}</option>
                    )
                })}
                </select>
                <h5>Fare: ₱{!isFare ? pass_dest.fare : 'loading..'}</h5>
                <p className='text-small'>Fare will be displayed after selecting a destination</p>
                <div className='d-flex flex-row justify-content-center justify-self-end fixed-bottom w-100 p-2 gap-5'>
                  <button onClick={e=>setisAddPassenger(false)} className='btn-secondary'>Back</button>
                  <button onClick={addPass} className='btn-primary'>Add</button>
                </div>
              </div>
            </>
          }
        </>
      : <Loading/>}
    </Dashboard>
  )
}

export default CHPS