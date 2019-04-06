import React from 'react';
import Webcam from 'react-webcam';

class MyWebcam extends React.Component {

    setRef = webcam => {
        this.webcam = webcam;
    };

    fetchData = async (byteArray) => {
        const apiKey = '022279c219444877b2491814b1b1c9ac';
        const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion'
        await fetch(apiEndpoint, {
            body: byteArray,
            headers: {
                'cache-control': 'no-cache', 'Ocp-Apim-Subscription-Key': apiKey, 'Content-Type': 'application/octet-stream'
            },
            method: 'POST'
        }).then(response => {
            try {
                response.json().then(data => {
                    const happiness = data[0].faceAttributes.emotion.happiness;
                    this.props.onReceivedResult(happiness);
                });
            } catch (err) {
                console.log(err);
            }
        });
    }

    startCapturing = () => {
        setInterval(() => {
            const image = this.capture();
            const byteArrayImage = this.convertToByteArray(image);
            this.fetchData(byteArrayImage);
        }, 50);
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
                    videoConstraints={videoConstraints} />
                <button onClick={this.startCapturing}>Start Game</button>
            </div>
        );
    }
}

export default MyWebcam;