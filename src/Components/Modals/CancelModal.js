import React from 'react'

function CancelModal({isOpen , setIsOpen , cancel}) {
  return (
    <>
        {isOpen ?
            <>
                <div className='modal-bg'>
                    <div className='modal-box'>
                        <h4>Cancel Checking</h4>
                        <br/>
                        <p>Are you sure you want to cancel this checking? </p>
                        <br/>
                        <div className='d-flex flex-row gap-2 justify-content-end float-end'>
                            <button onClick={()=> setIsOpen(false)}  className='btn-secondary no-m'>Cancel</button>
                            <button onClick={cancel} className='btn-primary no-m'>Confirm</button>
                        </div>
                    </div>
                </div>
            </> 
        : 
            <>
            </>
        }
    
    </>
  )
}

export default CancelModal