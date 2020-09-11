import React from 'react'


// currently not using the bird component but when I refactor plan on utilizing it then.
export default function Bird(){
    
    const handleEvent = (event) => {
        console.log("clicked")
        jump(event)
    }
    
    let pos = 70
    const jump = (event) => {
        let bird = event.target
        bird.style.position = 'relative'
        console.log(pos)
        bird.style.bottom = (pos + 20) + 'px'
        pos += 20
    }
    return(
        <img 
            onClick={handleEvent}
            src="https://i.gifer.com/origin/39/3933c213d43ed004e381fefdb9ec0605_w200.gif" 
            alt="flappy bird" 
            width={100}
        />
    )
}        