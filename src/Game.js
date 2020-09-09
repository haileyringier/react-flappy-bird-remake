import React from 'react'              

const initialPipe = {
            x: 700,
            y: 400,
            w: 40,
            h: 250,
}

export default class Game extends React.Component{

    state = {
        gravity: 0.8, 
        lift: -15,  
        bird: {
            x: 50,
            y: 100,
            radius: 20,
            velocity: 0
        },
       pipe: {
        x: 700,
        y: 400,
        w: 40,
        h: 250  
       },
       pipes: [
        {
            x: initialPipe.x,
            y: initialPipe.y,
            w: initialPipe.w,
            h: initialPipe.h
        }
       ]
    }

    draw = () => {
        const ctx = this.refs.canvas.getContext('2d')

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, this.refs.canvas.width,
            this.refs.canvas.height)  
        
        const bird = document.createElement('img')
        bird.src = 'https://i.gifer.com/origin/39/3933c213d43ed004e381fefdb9ec0605_w200.gif'
        ctx.drawImage(bird, this.state.bird.x, this.state.bird.y, 100, 100)
    }                      

    drawAllPipes = () => {
        this.state.pipes.forEach(pipe => this.drawPipe(pipe))
    }

    drawPipe = (pipe) => {
        const ctx = this.refs.canvas.getContext('2d')

        ctx.beginPath()
        ctx.strokeStyle = 'green'
        ctx.rect(pipe.x, pipe.y, pipe.w, pipe.h)
        ctx.stroke()
    }

    updateBird = () => {
        let newVelocity = (this.state.bird.velocity + this.state.gravity) * 0.9
        this.setState({
            bird: {
                x: 50,
                y: Math.max(
                    Math.min(
                        this.state.bird.y + newVelocity,
                        this.refs.canvas.height - this.state.bird.radius
                    ),
                    0
                ),
                radius: 20,
                velocity: newVelocity,
            }
        })
    }


    addPipeToState = () => {
        this.setState({
            pipes: [...this.state.pipes, initialPipe]
        })
    }
   
    updatePipeX = (pipe) => {   
        let newX = pipe.x - 1
        return { x: newX, y: 400, w: 40, h: 250 }
    }

    movePipes = () => {
        const updatedPipes = this.state.pipes.map(pipe => this.updatePipeX(pipe))
        this.setState({
            pipes: updatedPipes
        })
    }
    removePipes = () => {

    }

    componentDidMount(){
        setInterval(() => {
            this.draw()
            this.drawAllPipes()
            this.updateBird()       
            this.movePipes()
        }, 1000/60)
        setInterval(() => {
            this.addPipeToState()
        }, 150000/60)
        document.addEventListener('keydown', e =>
        e.keyCode === 32 ? this.setState({
            bird: {
                x: 50,
                y: this.state.bird.y,
                radius: 20,
                velocity: this.state.bird.velocity + this.state.lift
            }
        }) : null )
    }

    render(){
        return(
            <div className='canvas-section'>
                <canvas ref='canvas' className='canvas' width={700} height={625} />      
            </div>
        )
    }
}