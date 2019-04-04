import React from 'react'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Video from './Video'

function Displayer(props) {
  return <div>
      <Link className = "addIcon" to="AddVideo"></Link>
      <div>
          {props.posts.map((post, index) => <Video key = {index} post = {post}/>)}
      </div>
  </div>
}

Displayer.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Displayer
  