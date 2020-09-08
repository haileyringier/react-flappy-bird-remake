import React from 'react';
import './App.css';
import Game from './Game';
import Bird from './Bird'

export default class App extends React.Component {
  
  state = {
    score: 0,
    bird: {
      x: 50,
      y: 100,
      radius: 20,
      velocity: 0
    },
    gravity: 0.8,
    lift: -15


}
  render(){
  return (
    <div className="App">
      <h1>Flappy Bird in React</h1>
      <Game />
    </div>
  );
}
}


