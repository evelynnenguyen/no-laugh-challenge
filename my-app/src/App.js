import React, { Component } from 'react';
import './App.css';
import Displayer from './Components/Displayer'
import Title from './Components/Title';
import {Player} from 'video-react';

class App extends Component {
  render() {
    return(
      <div className="App">
        <Title title = {'No-laugh challenge'}/>
        <Player/>
      </div>
    )
  }
}

export default App;
