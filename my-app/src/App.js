import React, { Component } from 'react';
import './App.css';
import { useState } from 'react';
import MyWebcam from './components/MyWebcam'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Game />
      </div>
    );
  }
}

function Game() {
  const [result, updateResult] = useState(0);
  return (
    <div>
      <MyWebcam onReceivedResult={updateResult}/>
      <DisplayResult result={result}/>
    </div>
  );
}

function DisplayResult(props) {
  return (
    <div>
        <h1>{(Math.round((props.result) * 100) < 100) ? props.result + '%' : "Game Over" }</h1>
    </div>
  );
}




export default App;
