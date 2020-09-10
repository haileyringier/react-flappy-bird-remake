import React from 'react'

export default function Timer(props){

    return(
        <>
        <p>Score: {props.score}</p>
        <p>High Score: {props.highScore}</p>
        </>
    )
}