import React, { Component } from 'react';
import './App.css';
import Webcam from 'react-webcam';
import { useState } from 'react';

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
      <WebcamCapture onReceivedResult={updateResult}/>
      <DisplayResult result={result}/>
    </div>
  );
}

const DisplayResult = (props) => (
  <div>
    <h1>Happiness: {Math.round((props.result) * 100)}%</h1>
  </div>
);

class WebcamCapture extends React.Component {
  
  setRef = webcam => {
    this.webcam = webcam;
  };


  
  fetchData = async (byteArray) => {
    const apiKey = '[API-Key]';
    // const apiEndpoint = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_01&returnRecognitionModel=false';
    const temp = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion'
    await fetch(temp, {
      body: byteArray,
      headers: { 
        'cache-control': 'no-cache', 'Ocp-Apim-Subscription-Key': apiKey, 'Content-Type': 'application/octet-stream'
      },
      method: 'POST'
    }).then(result => {
        return result.json();
      }).then(data => {
          if (data) {
            const happiness = data[0].faceAttributes['emotion']['happiness'];
            console.log(happiness);
            this.props.onReceivedResult(happiness);
          }
      });
      
  }

  test = () => {
    const image = this.capture();
    const byteArrayImage = this.convertToByteArray(image);
    this.fetchData(byteArrayImage);
  };


  startCapturing = () => {
    setInterval(() => {
      const image = this.capture();
      const byteArrayImage = this.convertToByteArray(image);
      this.fetchData(byteArrayImage);
    }, 200);
  };

  convertToByteArray = (image) => {
    const base64 = require('base64-js');
    const base64string = image.split(',')[1];
    return base64.toByteArray(base64string)
  };

  capture = () => {
      return this.webcam.getScreenshot();
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
          height={1000}
          width={1000}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}/>
        <button onClick={this.startCapturing}>Start Game</button>
      </div>
    );
  }
}

export default App;
