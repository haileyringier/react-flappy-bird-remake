# Flappy Bird -  Remake using React 
> Mod 4 Project with Flatiron SE Program in Denver

## Table of contents
* [General info](#general-info)
* [Intro Video](#intro-video)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Contact](#contact)
* [License](#license)

## General info

Flappy Bird is a game where the player presses the space bar to keep a bird flying while using precise taps to keep the bird from hitting the randomly placed pipes. Each pipe that the bird makes it pass adds ten points to the player's score. This app was ceated using React, React-Bootstrap, HTML, and CSS. 


## Intro Video
[Mod 4 Presentation on Youtube]()

## Technologies
* HTML5
* CSS
* JavaScript
* React 
* React-Bootstrap

## Setup
To have full access to all the features in this application: 
1. Clone (https://github.com/haileyringier/mod-3-project-frontend) GitHub repositories locally to your computer
1. In the command line, navigate to the root directory of this repository, and enter the following: 
  $ npm install
1. To get the game started, run:
    $ npm start
    $ Click the start button, then click the bird that appears, to fly tap the space button. 

## Code Examples
```javaScript
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
            this.addPipesToState()
            this.removePipes()
            }
        }, 150000/60)
    }
```

```javascript
    gameOver = () => {
        this.state.bottomPipes.forEach(pipe => {
            if(pipe.x === 150 && pipe.added === false){
                this.plusTen()
            }
           if(
               this.state.bird.x + 50 > pipe.x - 20 
               && this.state.bird.x <= pipe.x + 20 
               && this.state.bird.y + 50 >= 625 - pipe.h
            ){  
            this.setState({gameOn: !this.state.gameOn})
            const ctx = this.refs.canvas.getContext('2d')
            ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
            this.setState({ bottomPipes: [] })
            this.setState({ topPipes: [] })
            this.setState({ bird: initialBird })
            this.setState({ gameOverAlert : true })
           }
        })
    }
```

## Features
* Tap sapce bar to make the bird fly
* Add points to the score for each pipe the bird passes
* compare your score to the high score
* Toast Alert to notify user game has ended 
* Start and stop game using one button

## Status
the next step in this project is to add A user login functionality and allow user to keep track of their scores. I also want to add a game highscore model, so user's can compete for the high score of the game. 


## Contact
Created by [Hailey Ringier](https://www.linkedin.com/in/hailey-ringier/) 

Feel free to contact me! 



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

