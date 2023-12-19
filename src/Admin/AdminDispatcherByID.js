import React from 'react'
import AdminNav from './Components/AdminNav'
import { useState , useEffect } from 'react'
import Loading from '../Components/Loading';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
function AdminDispatcherByID() {

    const params = useParams()
    const navigate = useNavigate()

    const [dispatcher, setdispatcher] = useState({});
    const [isLoading, setisLoading] = useState(false);

    const [isEditMode, setisEditMode] = useState(false);








    const updateUser = () =>{
        setisLoading(true)
        axios.put(process.env.REACT_APP_API_URL + '/users/' + params.id , 
        {first_name : dispatcher.first_name , middle_name : dispatcher.middle_name , last_name : dispatcher.last_name} ,
        {headers : {"ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json','Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
            console.log(e)
            if(e.status === 200){
                setisLoading(false)
                return window.location.reload()
            }
        }).catch(error => {
            if(error.response.status === 404){
                return navigate('/admin/dispatchers')
            }
            if(error.response.status === 422){
                setisLoading(false)
                return alert(`[status: ${error.response.status} ]An error while processing your request.`)
            }
            if(axios.isCancel(error)){
                alert(`[status: ${error.response.status} ]An error while processing your request.`)
                return setisLoading(false)
            }
        })
    }

    const deleteUser = () =>{
        axios.delete(process.env.REACT_APP_API_URL + '/users/' + params.id ,
        {headers : {"ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json','Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
            console.log(e)
            if(e.status === 200){
                setisLoading(false)
                return window.location.reload()
            }
        }).catch(error => {
            if(error.response.status === 404){
                return navigate('/admin/dispatchers')
            }
            if(axios.isCancel(error)){
                alert(`[status: ${error.response.status} ]An error while processing your request.`)
                return setisLoading(false)
            }
        })
    }
 

    useEffect(() => {
        setisLoading(true)
        axios.get(process.env.REACT_APP_API_URL + '/users/' + params.id, {headers : {"ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json','Authorization' : 'Bearer ' + Cookies.get('admin_token')}}).then(e=>{
            if(e.status === 200){
                setdispatcher(e.data)
                return setisLoading(false)
            }
        }).catch(error => {
            if(error.response.status === 404){
                return navigate('/admin/dispatchers')
            }
            if(axios.isCancel(error)){
                alert(`[status: ${error.response.status} ]An error while processing your request.`)
                return setisLoading(false)
            }
        })
       
    }, []);


    return (
        <AdminNav>
            {
                !isLoading ? 
                    <>
                        <div className='d-flex flex-row align-items-center mt-2 mb-2'>
                        <img className='icon-primary' src='/imgs/dispatcher.png' alt='destination_logo'/>
                            <div>
                                <h4>CB-Transco</h4>
                                <h3 className='fc-primary-logo'>Dispatcher</h3>
                            </div>
                        </div>
                        <br/>
                        <div>
                            { !isEditMode ? 
                                    <>
                                        <h4>{dispatcher.first_name} {dispatcher.middle_name} {dispatcher.last_name}</h4>
                                        <h6>{dispatcher.email}</h6>
                                    </>
                                :   <div className='d-flex flex-column justify-content-center'>
                                        <input className='input-primary' type='text' onChange={e=> setdispatcher({...dispatcher , first_name : e.target.value})} value={dispatcher.first_name} />
                                        <input className='input-primary' type='text' onChange={e=> setdispatcher({...dispatcher , middle_name : e.target.value})} value={dispatcher.middle_name} />
                                        <input className='input-primary' type='text' onChange={e=> setdispatcher({...dispatcher , last_name : e.target.value})} value={dispatcher.last_name} />
                                    </div>
                            }
                        </div>
                        <div className='d-flex flex-row justify-content-center gap-2'>
                            <button className='btn' onClick={()=> isEditMode ? setisEditMode(false) : setisEditMode(true)}>
                                {
                                    isEditMode ? 
                                        <img className='icon-small' src='/imgs/cancel.png' alt='cancel'/>
                                    :   <img className='icon-small' src='/imgs/edit.png' alt='edit'/>
                                }
                            </button>
                            {
                                isEditMode ? 
                                <button onClick={updateUser} className='btn'><img className='icon-small' src='/imgs/save.png' alt='save'/></button>
                                :<></>
                            }
                            <button onClick={deleteUser} className='btn'><img className='icon-small' src='/imgs/delete.png' alt='deleted'/></button>
                        </div>
                    </>
                : <Loading/>
            }

        </AdminNav>
    )
}

export default AdminDispatcherByID