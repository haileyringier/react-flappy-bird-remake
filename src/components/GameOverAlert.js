import React from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastHeader from 'react-bootstrap/ToastHeader'
import ToastBody from 'react-bootstrap/ToastBody'


export default function GameOverAlert(props) {


    return(
        <div className='toast-alert'>
            <Toast>
                <ToastHeader>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Flappy Bird</strong>
                    <button type="button" onClick={props.dismiss} className="close ml-2 mb-1" data-dismiss="toast"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                    <small>Try again</small>
                </ToastHeader>
                <ToastBody>Nice try! Your scorce: INSERT SCORE</ToastBody>
            </Toast>
        </div>
    )
}