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