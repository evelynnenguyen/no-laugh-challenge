import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Webcam from 'react-webcam';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Webcam />
      </div>
    );
  }
}

class WebcamCapture extends React.Component {
  setRef = webcam => {
    this.webcam = webcam;
  };
 
  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
  };
 
  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
 
    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
      </div>
    );
  }
}

export default App;
