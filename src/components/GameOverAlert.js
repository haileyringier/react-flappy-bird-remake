import React from 'react'
import Toast from 'react-bootstrap/Toast'
// import ToastHeader from 'react-bootstrap/ToastHeader'
import ToastBody from 'react-bootstrap/ToastBody'


export default function GameOverAlert(props) {


    return(
        <div className='toast-alert'>
            <Toast>
                {/* <ToastHeader closeButton="true"  >
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Flappy Bird</strong>
                    <button type="button" onClick={props.dismiss} className="close ml-2 mb-1" data-dismiss="toast"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                    <small>Try again</small>
                </ToastHeader> */}
                <ToastBody>
                    <strong className="mr-auto">NICE TRY!</strong>
                    <strong className="mr-auto">Your Score: {props.score}</strong>
                    <small>Try again</small>
                    <button type="button" onClick={props.dismiss}><span aria-hidden="true">×</span><span>Close</span></button>
                </ToastBody>
            </Toast>
        </div>
    )
}