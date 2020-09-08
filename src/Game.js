import React from 'react'
import Bird from './Bird'

export default class Game extends React.Component{

    state = {
        gravity: 0.8, 
        lift: -15,  
        bird: {
            x: 50,
            y: 100,
            radius: 20,
            velocity: 0
        }
    }

    draw = () => {
        const ctx = this.refs.canvas.getContext('2d')

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, this.refs.canvas.width,
            this.refs.canvas.height)

        // ctx.beginPath()
        // ctx.arc(this.state.bird.x, this.state.bird.y, this.state.bird.radius, 0, 2 * Math.PI)
        // ctx.fillStyle = 'red'
        // ctx.fill()
        // ctx.stroke()
        
        const bird = document.createElement('img')
        bird.src = 'https://i.gifer.com/origin/39/3933c213d43ed004e381fefdb9ec0605_w200.gif'
        ctx.drawImage(bird, this.state.bird.x, this.state.bird.y, 100, 100)

    }    

    update = () => {
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

    componentDidMount(){
        setInterval(() => {
            this.update()
            this.draw()
        }, 1000/60)
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
            <div>
                <canvas ref='canvas' className='canvas' width={450} height={625} />      
            </div>
        )
    }
}