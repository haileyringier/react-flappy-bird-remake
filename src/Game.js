import React from 'react'              
import StartButton from './components/StartButton'
import Timer from './components/Timer'
import GameOverAlert from './components/GameOverAlert'

// const initialPipe = {
//             x: 700,
//             y: 475,
//             w: 40,
//             h: 150,
// }

const initialBird = {
    x: 50,
    y: 100,
    radius: 20,
    velocity: 0
}

export default class Game extends React.Component{

    state = {
        gameOn: false,
        score: 0,
        highScore: 0,
        gameOverAlert: false, 
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
            h: 150,
            added: false
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
            pipes: [...this.state.pipes, {x:700, y: y, w: 40, h: newHeight, added: false}]
        })
    }
   
    updatePipeX = (pipe) => {   
        let newX = pipe.x - 1
        return { x: newX, y: pipe.y, w: pipe.w, h: pipe.h, added: pipe.added}
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
    plusTen = () => {
        let newScore = this.state.score + 10
        this.setState({score: newScore})
        if(newScore > this.state.highScore){
            this.setState({highScore: newScore})
        }
    }

    gameOver = () => {
        this.state.pipes.forEach(pipe => {
            if(pipe.x === 50 && pipe.added === false){
                this.plusTen()
            }
           if(this.state.bird.x + 50 > pipe.x - 20 && this.state.bird.x + 50 < pipe.x + 20 && this.state.bird.y + 50 >= 625 - pipe.h){  
            this.setState({gameOn: !this.state.gameOn})
            const ctx = this.refs.canvas.getContext('2d')
            ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
            this.setState({ pipes: [] })
            this.setState({ bird: initialBird })
            this.setState({gameOverAlert : true})
            this.setState({score: 0})
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

    dismissAlert = () => {
        this.setState({gameOverAlert: false})
    }

    render(){
        return(
           <>
            <div className='header-section'>
                <StartButton clickAction={this.startButtonClick}/>
                <Timer score={this.state.score} highScore={this.state.highScore}/>
            </div>
                <div className='game-section'>
                    {this.state.gameOverAlert ? <GameOverAlert dismiss={this.dismissAlert} score={this.state.score}/> : null}
                    <canvas ref='canvas' className='canvas' width={700} height={625} />      
            </div>
            </>
        )
    }
}