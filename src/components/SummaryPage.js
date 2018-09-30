// This is the transaction to query: 0x2a8b9ca048e37d1a78e2c4a8e470280981709d006b525f2dcf9a6b5b3a6aa39e
import React, { Component } from "react";
import { Panel } from 'react-bootstrap';

export default class SummaryPage extends Component {
    componentWillMount(){
    }
    render() {
        return (  
        <div>
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title>Passport information</Panel.Title>
                </Panel.Heading>
                {/* <Panel.Body>{this.props.readPassport('0x28dda3a4ef0e7f98ea12edd306e271c1a277f986')}</Panel.Body> */}
                <Panel.Body>
                    Name: Cara{this.props.readPassportName()}<br/>
                    Country: South Africa{this.props.readPassportCountry()}<br/>
                    Passport Number: 12345{this.props.readPassportNumber()}<br/>
                    Birthday: 1994-03-29{this.props.readPassportBirthday()}<br/>
                    Gender: Female{this.props.readPassportGender()}<br/>
                    Country of Birth: Canada{this.props.readPassportOrigin()}<br/>
                    Passport Issuer: Canada{this.props.readPassportIssuer()}<br/>
                    Last Travel Location: South Africa{this.props.readLastTravelLocation()}
                </Panel.Body>
            </Panel>
        </div>
        );
    }
}