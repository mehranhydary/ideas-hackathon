import React, { Component } from "react";
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button } from "react-bootstrap";
import Particles from 'react-particles-js';

export default class RegistrationPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: '',
      country: '',
      passportNumber: '',
      birthday: '',
      gender: '',
      placeOfBirth: '',
      issuingAuth: '',

    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      
      <div className="RegistrationPage">
      
        <div className="lander">
          <h1>Atlas</h1>
          <p>Registration Page</p>
        </div>

        <form>
          <FormGroup
            controlId="formBasicText"
          >
            <HelpBlock>DIGITAL PASSPORT REGISTRATION FORM</HelpBlock>
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.name}
              placeholder="Enter Name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />


            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select Country</ControlLabel>
              <FormControl componentClass="select" placeholder="Select country">
                <option value="select">Select</option>
                <option value="Canada">Canada</option>
              </FormControl>
            </FormGroup>

            <ControlLabel>Passport Number</ControlLabel>
            <FormControl
              type="text"
              value={this.state.passportNumber}
              placeholder="Enter Passport Number"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />

            <ControlLabel>Date Of Birth</ControlLabel>
            <FormControl
              type="text"
              value={this.state.birthday}
              placeholder="Enter Date Of Birth"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />

            <ControlLabel>Gender</ControlLabel>
            <FormControl
              type="text"
              value={this.state.gender}
              placeholder="Enter Gender"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />

            <ControlLabel>Place of Birth</ControlLabel>
            <FormControl
              type="text"
              value={this.state.placeOfBirth}
              placeholder="Enter Place of Birth"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />

            <ControlLabel>Issuing Authority</ControlLabel>
            <FormControl
              type="text"
              value={this.state.issuingAuth}
              placeholder="Enter Issuing Authority/Country"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />

            <Button type="submit">Submit</Button>

          </FormGroup>
        </form>
      </div>
      
    );
  }
}