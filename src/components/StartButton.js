import React from 'react'

export default function StartButton(props) {

    return(
        <button 
            className='start-button'
            onClick={props.clickAction}
            >
        Start Game
        </button>
    )
}