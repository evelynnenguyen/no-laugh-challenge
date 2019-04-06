import React from 'react';
import Webcam from 'react-webcam';

class MyWebcam extends React.Component {

    setRef = webcam => {
        this.webcam = webcam;
    };

    // capture = () => {
    //     console.log('capturing');
    //     const image = this.webcam.getScreenshot();
    //     const byteArrayImage = this.convertToByteArray(image);
    //     this.fetchData(byteArrayImage);
    // };

    startCapturing = () => {
        setInterval(() => {
            const image = this.webcam.getScreenshot();
            const byteArrayImage = this.convertToByteArray(image);
            this.fetchData(byteArrayImage);
        }, 150);
    };

    convertToByteArray = (image) => {
        const base64 = require('base64-js');
        const base64string = image.split(',')[1];
        return base64.toByteArray(base64string)
    };

    fetchData = (byteArray) => {
        const apiKey = '022279c219444877b2491814b1b1c9ac';
        const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion'
        fetch(apiEndpoint, {
            body: byteArray,
            headers: {
                'cache-control': 'no-cache', 'Ocp-Apim-Subscription-Key': apiKey, 'Content-Type': 'application/octet-stream'
            },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    const happiness = (data[0] != null ? data[0].faceAttributes.emotion.happiness : "0");
                    this.props.onReceivedResult(happiness);
                });
            }
        });
    }

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
                    videoConstraints={videoConstraints} />
                <button onClick={this.startCapturing}>Start Game</button>
            </div>
        );
    }
}

export default MyWebcam;