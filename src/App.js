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
      </header>
      <Game />
    </div>
  );
}
}


