// This is the transaction to query: 0x2a8b9ca048e37d1a78e2c4a8e470280981709d006b525f2dcf9a6b5b3a6aa39e
import React, { Component } from "react";
import { Panel } from 'react-bootstrap';

export default class SummaryPage extends Component {
    componentWillMount(){
        this.props.readPassportCreationTransaction('0x2a8b9ca048e37d1a78e2c4a8e470280981709d006b525f2dcf9a6b5b3a6aa39e');
    }
    render() {
        return (  
        <div>
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Panel heading</Panel.Title>
                </Panel.Heading>
                <Panel.Body></Panel.Body>
            </Panel>
        </div>
        );
    }
}