import React from 'react';
import { useState } from 'react';
import MyWebcam from './MyWebcam'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Alert from 'react-bootstrap/Alert'
import {Container, Row, Col} from 'react-bootstrap';


function EmotionAnalysis() {
    const [result, updateResult] = useState(0);
    return (
        <div>
            <MyWebcam onReceivedResult={updateResult}/>
            <Result result={result} />
        </div>
    );
}

function Result(props) {
    return (
        <div>
            <Container>
                <Row>
                    <Col />
                    <Col xs={10}>
                        <h1>{props.result < 100 ? props.result + '%' : <GameOver />}</h1>
                        <ProgressBar now={props.result} variant="danger" />
                    </Col>
                    <Col />
                </Row>
            </Container>

        </div>
    );
}



function GameOver() {
    return (
        <div>
            <Alert variant="danger">
                <Alert.Heading>Game Over!</Alert.Heading>
            </Alert>
        </div>
    );
}


export default EmotionAnalysis;