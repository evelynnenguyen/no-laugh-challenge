# Implementing Video Player
## Getting started
Firstly, check that if you have node and npm installed.  
To check if you have Node.js installed, run this command in your terminal:  
`node -v`  
To confirm that you have npm installed you can run this command in your terminal:  
`npm -v`

If you don't have npm or Node.js, download and install npm and Node.js [here.](https://www.npmjs.com/get-npm)  
You’ll need to have Node 8.10.0 or later on your local development machine.

## Create React App
To create a new app, we choose to use `npm` method.

In your terminal, navigate to the destination folder that you want to create your application. type in the following command:

```npm init react-app my-app```  

(_`npm init <initializer>`_ is available in `npm` 6+)

It will create a directory called my-app inside the current folder.
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```
## Running the app
Once installation is done, navigate to your project folder:  
```npm start```  
Then open http://localhost:3000/ to see your app.

Now you are good to go to the next step building your own React App by editing src/App.js

## Installing packages
There are many existing packages (libraries) that we can utilize to create cool components of own React application. In order to implement video components, we will use `react-player`, `react-router-dom` and `prop-types`.

If your app is still running, press `ctrl+C` (Windows) or `command+C` (MacOS) in your terminal. Make sure you are in you project folder 'my-app'. Let's install:
1. [react-player](https://www.npmjs.com/package/react-player)

```npm install react-player --save```

This will enable you to display and control components related to video in your React application.

2. [react-router-dom](https://www.npmjs.com/package/react-router-dom)

```npm install --save react-router-dom```

React-router is used for navigation purposes in a react application.  

3. [prop-types](https://www.npmjs.com/package/prop-types)

```npm install --save prop-types```

PropTypes was originally exposed as part of the React core module, and is commonly used with React components. It helps you to catch bugs and serves as a handy documentation on how a component has to be used in terms of passing props.

## Implementing video player

In folder **src**, create a folder named **Components** containing files named `Title.js`, `Video.js`, `Displayer.js`, and `AddVideo.js`.

### Title.js

`Title.js` will render the title name which is passed in as a prop to `App.js`.   
Using `this.props.title` (PropTypes) allows us to change title name to whatever we want by simply change the title value in App.js, i.e. without changing anything in the individual component file itself.

```javascript
import React, {Component} from 'react';

class Title extends Component {
    render() {
        return (
            <h1> {this.props.title} </h1>
        )
    }
}

export default Title
```

### Video.js
```javascript
import React from 'react'
import propTypes from 'prop-types'
import ReactPlayer from 'react-player'

function Video(props) {
    const post = props.post
        return <div className = "video-wrapper">            
            <ReactPlayer className = "video"
            url = {post.videoLink}
            playing
            controls
            />
        </div>
}

Video.propTypes = {
    post: propTypes.object.isRequired
}

export default Video
```

### Displayer.js
```javascript
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
```

### AddVideo.js
```javascript
import React, {Component} from 'react'

class AddVideo extends Component {

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        const videoLink = event.target.elements.link.value
        const post = {
            id: Number(new Date()),
            videoLink: videoLink
        }
        if (videoLink){
            this.props.onAddVideo(post)
        }
    }

    render() {
        return (
            <div>
                <h1> No-Laugh Challenge </h1>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <input type = "text" placeholder="Link" name="link"/>
                        <button> Play </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddVideo
```
### App.js

```javascript
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
```

### index.js

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './Components/stylesheet.css'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
```
