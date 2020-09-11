import React from 'react'

export default function Timer(props){

    return(
        <>
        <p className="score-section">Score: {props.score}</p>
        <p className="score-section">High Score: {props.highScore}</p>
        </>
    )
}