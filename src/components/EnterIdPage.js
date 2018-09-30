import React, { Component } from "react";
import { withRouter } from 'react-router-dom'

export default class EnterIdPage extends Component {

    onClick = () => {
        this.props.history.push('/entrypage')
    }

    render() {
        return (  
        <div className="image">
            <a onClick={this.onClick}><img style={{'height':100+'px', 'animation':'spin 4s linear infinite'}}src={require('../download.png')} /></a>
        </div>
        );
    }
}