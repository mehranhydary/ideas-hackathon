import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Table, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import getWeb3 from '../lib/getWeb3';
import TravelEntryFactory from '../../build/contracts/TravelEntryFactory.json';

export default class TravelEntryPage extends Component {

    state = {
        location: '',
        entryDate: '',
        exitDate: '',
        stamped: false,
        web3: '',
        account: ''
    }

    componentWillMount() {
        getWeb3
        .then(results => {
          this.setState({
            web3: results.web3,
            account: results.web3.eth.accounts[0]
          })
        })
        .catch(err => {
          console.log('Error finding web3.', err);
        })
      }
    
    handleChange = (e) => {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);        
    }

    handleEntryChange(date) {
        this.setState({
          entryDate: date
        });
    }

    handleExitChange(date) {
        this.setState({
          exitDate: date
        });
    }

    handleClick = () => {
        this.setState({ stamped: true });        
    }
    
    
    onSubmit = (e) => {
        e.preventDefault()
        this.props.createTravelEntryOnBlockchain(
            this.state.location,
            this.state.entryDate
        )
    }
    
    render() {
        const { stamped } = this.state;
        return (  
        <div>
            <form>
                <FormGroup
                >
                <ControlLabel>Location</ControlLabel>
                <FormControl
                    name="location"
                    type="text"
                    id="location"
                    value={this.state.location}
                    placeholder="Enter Location"
                    onChange={(e) => this.handleChange(e)}
                />
                <FormControl.Feedback />
                <ControlLabel>Entry Date: </ControlLabel>
                <DatePicker
                    name="entryDate"
                    id="dateInput"
                    className="form-control"
                    selected={this.state.entryDate}
                    onChange={(e) => this.handleEntryChange(e)}
                />
                {/* @MEHRAN - I think we are considering leaving out Exit Date from the form as it doesn't make too much sense to add it */}
                {/* HOWEVER - once they do the stamp button it provides the Exit Date */}
                <ControlLabel>Exit Date: </ControlLabel>
                <DatePicker
                    name="exitDate"
                    id="dateInput"
                    className="form-control"
                    selected={this.state.exitDate}
                    onChange={(e) => this.handleExitChange(e)}
                />
                <FormControl.Feedback />
                </FormGroup>
                <Button onClick={(e) => this.onSubmit(e)} bsStyle="primary">Submit</Button>
            </form>

            <Table striped bordered condensed hover className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Location</th>
                        <th>Entry Date</th>
                        <th>Exit Date</th>
                        <th>Issuing Authority</th>
                        <th>Digital Stamp</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>
                            <Button
                                bsStyle="primary"
                                disabled={this.state.stamped}
                                onClick={!this.state.stamped ? this.handleClick : null}
                            >
                                {stamped ? 'Stamped' : 'Stamp'}
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>

        )
    }
}

