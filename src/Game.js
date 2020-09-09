import React from 'react'              
import StartButton from './components/StartButton'
import Timer from './components/Timer'

// const initialPipe = {
//             x: 700,
//             y: 475,
//             w: 40,
//             h: 150,
// }

export default class Game extends React.Component{

    state = {
        gameOn: false,
        gravity: 0.8, 
        lift: -15,  
        bird: {
            x: 50,
            y: 100,
            radius: 20,
            velocity: 0
        },
       pipes: [
            {
            x: 550,
            y: 475,
            w: 40,
            h: 150
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

    drawAllPipes = () => {
        this.state.pipes.forEach(pipe => this.drawPipe(pipe))
    }

    drawPipe = (pipe) => {
        const ctx = this.refs.canvas.getContext('2d')

        ctx.fillStyle = 'green'
        ctx.beginPath()
        ctx.fillRect(pipe.x, pipe.y, pipe.w, pipe.h)
        ctx.stroke()
    }

    addPipeToState = () => {
        const heights = [75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325]
        const newHeight = heights[Math.floor(Math.random()*heights.length)]
        const y = 650 - newHeight
        this.setState({
            pipes: [...this.state.pipes, {x:700, y: y, w: 40, h: newHeight}]
        })
    }
   
    updatePipeX = (pipe) => {   
        let newX = pipe.x - 1
        return { x: newX, y: pipe.y, w: pipe.w, h: pipe.h}
    }

    movePipes = () => {
        const updatedPipes = this.state.pipes.map(pipe => this.updatePipeX(pipe))
        this.setState({
            pipes: updatedPipes
        })
    }
    removePipes = () => {
        const filtered = this.state.pipes.filter(pipe => pipe.x > -40)
        this.setState({
            pipes: filtered
        })
    }

    gameOver = () => {
        this.state.pipes.forEach(pipe => {
           if(this.state.bird.x + 50 > pipe.x - 20 && this.state.bird.x + 50 < pipe.x + 20 && this.state.bird.y + 50 >= 625 - pipe.h){
            console.log("gameover") 
            console.log("pipe:",pipe.x, pipe.y)
            console.log(this.state.bird.x, this.state.bird.y)  
            this.setState({gameOn: !this.state.gameOn})
            const ctx = this.refs.canvas.getContext('2d')
            ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
            this.setState({pipes: []})
           }
        })
    }

    gameRunning = () => {
        setInterval(() => {
            if(this.state.gameOn === true){
            this.gameOver()
            this.draw()
            this.drawAllPipes()
            this.updateBird()       
            this.movePipes()
            }
        }, 1000/60)
        setInterval(() => {
            if(this.state.gameOn === true){
            this.addPipeToState()
            this.removePipes()
            }
        }, 150000/60)
    }
    startButtonClick = () => {
        this.setState({
            gameOn: !this.state.gameOn
        })
        console.log(this.state.gameOn)
    }

    componentDidMount(){
        this.gameRunning()
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
           <>
            <div className='header-section'>
                <StartButton clickAction={this.startButtonClick}/>
                <Timer />
            </div>
                <div className='game-section'>
                    <canvas ref='canvas' className='canvas' width={700} height={625} />      
            </div>
            </>
        )
    }
}