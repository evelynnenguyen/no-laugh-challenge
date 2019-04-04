import React, { Component } from 'react'
import './Components/stylesheet.css'
import Displayer from './Components/Displayer'
import Title from './Components/Title'
import AddVideo from './Components/AddVideo'
import {Route} from 'react-router-dom'

class App extends Component {
  constructor(){
    super()
    this.state = {
        posts: [{
            id: 0,
            videoLink: ""
            }]
    }
}

addVideo(postSubmitted) {
    this.setState(state => ({
        posts: [postSubmitted]
    }))
}

componentDidMount() {
}

// this get called whenever the component is re-rendered
componentDidUpdate(prevProps, prevState) {
    // alert('re-render')
    console.log(prevState.posts)
    console.log(this.state)
}

render () {
    console.log(this.state.posts)
    return (<div>
        <Route exact path = "/" render={() => (
            <div>
                <Title title = {'No-Laugh Challenge'}/>
                <Displayer posts = {this.state.posts} onNavigate = {this.navigate}/>
            </div>
        )}/>

        <Route path= "/AddVideo" render = {({history}) => (
            <div>
              <AddVideo onAddVideo={(addedPost) => {
                  console.log(addedPost)
                  this.addVideo(addedPost)
                  history.push('./')
              }}/>
            </div>
        )}/>
    </div>
    )
}
}

export default App;
