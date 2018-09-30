import React, { Component } from "react";
import { withRouter } from 'react-router-dom'

export default class EnterIdPage extends Component {

    onClick = () => {


        this.props.history.push('/entrypage')
    }

    render() {
        return (  
        <div className="image">
            <a onClick={this.onClick}><img src={require('../download.png')} /></a>
        </div>
        );
    }
}