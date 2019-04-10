import React, { Component } from 'react'
import './Components/stylesheet.css'
import Displayer from './Components/Displayer'
import Title from './Components/Title'
import AddVideo from './Components/AddVideo'

class App extends Component {
    constructor() {
        super()
        this.state = {
            posts: [{
                videoLink: ""
            }]
        }
    }

    addVideo(postSubmitted) {
        this.setState(state => ({
            posts: [postSubmitted]
        }))
    }

    render() {
        return (<div>
            <Title title={'No-Laugh Challenge'} />
            <Displayer posts={this.state.posts}/>
            <AddVideo onAddVideo={(addedPost) => {
                this.addVideo(addedPost)
            }}/>
        </div>
        )
    }
}

export default App;
