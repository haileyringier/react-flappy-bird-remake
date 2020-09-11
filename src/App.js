import React from 'react';
import './App.css';
import Game from './Game';

export default class App extends React.Component {
  
  render(){
  return (
    <div className="App">
      <header>
      <h1>Flappy Bird</h1>
      <p className="sub-title">Remake of the classic game using React</p>
        {/* <img  className="header" src="https://www.pngfind.com/pngs/m/210-2109009_3676-x-976-16-0-flappy-bird-logo.png"></img> */}
      </header>
      <Game />
    </div>
  );
}
}


