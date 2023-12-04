import React from 'react'

function SubmitModal({isOpen , setIsOpen , submit}) {
  return (
    <>
        {isOpen ?
            <>
                <div className='modal-bg'>
                    <div className='modal-box'>
                        <h4>Submit Checking</h4>
                        <br/>
                        <p>Your about to submit this checking there is no editing or deleting this checking we advice to double check first.</p>
                        <br/>
                        <div className='d-flex flex-row gap-2 justify-content-end float-end'>
                            <button onClick={()=> setIsOpen(false)}  className='btn-secondary no-m'>Cancel</button>
                            <button onClick={submit} className='btn-primary no-m'>Confirm</button>
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

export default SubmitModal