import React from 'react';
import { useState } from 'react';
import MyWebcam from './MyWebcam'


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
            <h1>{(Math.round((props.result) * 100) < 100) ? (Math.round((props.result) * 100)) + '%' : "Game Over"}</h1>
        </div>
    );
}


export default EmotionAnalysis;