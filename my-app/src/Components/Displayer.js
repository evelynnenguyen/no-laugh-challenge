import React, { Component } from 'react';
import {Player} from 'video-react';

class Displayer extends Component {
    render () {
      return (
          <div className='player-wrapper'>
          <Player>
            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
          </Player>
        </div>
      )
    }
  }

export default Displayer
  