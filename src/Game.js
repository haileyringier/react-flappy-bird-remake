import React from 'react'              

const initialPipe = {
    pipe: {
            x: 700,
            y: 400,
            w: 40,
            h: 250,
    }
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
       pipes: {
           pipe1: {
               x: 700,
               y: 400,
               w: 40,
               h: 250
           },
           pipe2: {
            x: 700,
            y: 400,
            w: 40,
            h: 250
           }
       }
    }

    draw = () => {
        const ctx = this.refs.canvas.getContext('2d')

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, this.refs.canvas.width,
            this.refs.canvas.height)  
        
        const bird = document.createElement('img')
        bird.src = 'https://i.gifer.com/origin/39/3933c213d43ed004e381fefdb9ec0605_w200.gif'
        ctx.drawImage(bird, this.state.bird.x, this.state.bird.y, 100, 100)

        ctx.fillStyle = 'green'        
        ctx.fillRect(this.state.pipes.pipe1.x, this.state.pipes.pipe1.y, this.state.pipes.pipe1.w, this.state.pipes.pipe1.h)
        
        this.generatePipes()
    }                      
            
    generatePipes = () => {
        const ctx = this.refs.canvas.getContext('2d')

        ctx.fillStyle = 'green'        
        const pipe = ctx.fillRect(initialPipe.pipe.x, initialPipe.pipe.y, initialPipe.pipe.w, initialPipe.pipe.h)
        this.setState({
            // pipes: [...this.state.pipes, pipe]
        })
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
    movePipe = () => {   
        let newX = this.state.pipes.pipe1.x - 1
        this.setState({
            pipes: {
                pipe1: {
                    x: newX,
                    y: this.state.pipes.pipe1.y,
                    w: this.state.pipes.pipe1.w,
                    h: this.state.pipes.pipe1.h
            }
        }
        })

    }

    componentDidMount(){
        setInterval(() => {
            this.updateBird()
            this.draw()
            this.movePipe()
        }, 1000/60)
        setInterval(() => {
            this.generatePipes()
        }, 3000)
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