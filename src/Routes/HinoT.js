import React from 'react'
import Dashboard from '../Components/Dashboard'
import { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Loading from '../Components/Loading';

function HinoT() {

    /* URL PARAMETER */
    const id = useParams()
    /* states */
    const [isLoading, setisLoading] = useState(false);

    /* loaded data */
    const [hino, sethino] = useState({});
    const [trips, settrips] = useState([]);



    const loadtrip = () =>{
        setisLoading(true)
        axios.get(process.env.REACT_APP_API_URL + `/transactions/bus_trip/${id.id}` , {headers : {'Authorization' : 'Bearer ' + Cookies.get('token')}}).then(e=>{
            console.log(e.data)
            settrips(e.data)
            setisLoading(false)
        }).catch(error=>{
            console.log(error)
            alert(`[status: ${error.response.status} ]An error while processing your request.`)
        })
    }


    useEffect(() => {
        setisLoading(true)
        axios.get(process.env.REACT_APP_API_URL + `/hino/${id.id}` , {headers : {'Authorization' : 'Bearer ' + Cookies.get('token')}}).then(e=>{
            console.log(e.data)
            sethino(e.data)
            setisLoading(false)
            loadtrip()
        }).catch(error=>{
            console.log(error)
            alert(`[status: ${error.response.status} ]An error while processing your request.`)
        })
    
    }, []);

    return (
        <Dashboard>
            {!isLoading ? 
                <div className='col-xl-4 col-12'>
                    <div className='d-flex flex-row align-items-center'>
                        <img className='icon-primary' src='/imgs/bus.png' alt='bus'/>
                        <div className='d-flex flex-column'>
                        <h4>{hino.name}</h4>
                        <h2 className='fc-primary-logo'>Trip Record</h2>
                        </div>
                    </div>
                    <div>
                    {
                        (trips.length > 0) ?
                        trips.map((trip , index)=>{
                            return (
                                <div key={index} className='bg-gui mt-2 p-2 rounded d-flex flex-row align-items-center'>
                                    <img className='icon-primary p-2' src='/imgs/dispatcher.png' alt='dispatcher'/>
                                    <div className='text-small'>
                                        <p>
                                            Dispatch By: {trip.full_name} <br/>   
                                            Origin: {trip.origin} <br/>   
                                            Date & Time: {trip.date} {trip.time}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                        : <p className='text-center'><b>No trip records available today.</b></p>
                    }
                    </div>
                    <div className='d-flex justify-content-center align-items-center fixed-bottom'>
                        <a href='/hino' className='btn-primary'>Back</a>
                    </div>
                </div>
            : <Loading/>}
        </Dashboard>
    )
}

export default HinoT