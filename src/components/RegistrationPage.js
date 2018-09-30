import React, { Component } from "react";
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button } from "react-bootstrap";

export default class RegistrationPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      country: '',
      passportNumber: '',
      birthday: '',
      gender: '',
      placeOfBirth: '',
      issuingAuth: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleChange(e) {
    let change = {}
    change[e.target.name] = e.target.value;
    this.setState(change)
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.props.createPassportOnBlockchain(
      this.state.name, 
      this.state.country, 
      this.state.passportNumber, 
      this.state.birthday, 
      this.state.gender, 
      this.state.placeOfBirth, 
      this.state.issuingAuth
      );
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
              name='name'
              type="text"
              value={this.state.name}
              placeholder="Enter Name"
              onChange={this.handleChange.bind(this)}
            />
            <FormControl.Feedback />


            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select Country</ControlLabel>
              <FormControl 
                onChange={this.handleChange.bind(this)} 
                componentClass="select" 
                placeholder="Select country"
                name='country'
              >
                <option disabled value="China">China</option>
                <option value="Canada">Canada</option>
              </FormControl>
            </FormGroup>

            <ControlLabel>Passport Number</ControlLabel>
            <FormControl
              name='passportNumber'
              type="text"
              value={this.state.passportNumber}
              placeholder="Enter Passport Number"
              onChange={this.handleChange.bind(this)}
            />
            <FormControl.Feedback />

            <ControlLabel>Date Of Birth</ControlLabel>
            <FormControl
              name='birthday'
              type="text"
              value={this.state.birthday}
              placeholder="Enter Date Of Birth"
              onChange={this.handleChange.bind(this)}
            />
            <FormControl.Feedback />

            <ControlLabel>Gender</ControlLabel>
            <FormControl
              name='gender'
              type="text"
              value={this.state.gender}
              placeholder="Enter Gender"
              onChange={this.handleChange.bind(this)}
            />
            <FormControl.Feedback />

            <ControlLabel>Place of Birth</ControlLabel>
            <FormControl
              name='placeOfBirth'
              type="text"
              value={this.state.placeOfBirth}
              placeholder="Enter Place of Birth"
              onChange={this.handleChange.bind(this)}
            />
            <FormControl.Feedback />

            <ControlLabel>Issuing Authority</ControlLabel>
            <FormControl
              name='issuingAuth'
              type="text"
              value={this.state.issuingAuth}
              placeholder="Enter Issuing Authority/Country"
              onChange={this.handleChange.bind(this)}
            />
            <FormControl.Feedback />

            <Button type="submit" onClick={this.handleFormSubmit} >Submit</Button>

          </FormGroup>
        </form>
      </div>
      
    );
  }
}