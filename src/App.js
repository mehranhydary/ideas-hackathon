import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import getWeb3 from './lib/getWeb3';
import PassportFactory from '../build/contracts/PassportFactory.json';
import TravelEntryFactory from '../build/contracts/TravelEntryFactory.json';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      web3: "",
      account: ""
    }
  }
  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
        account: results.web3.eth.accounts[0]
      })
      this.instantiateContract();
    })
    .catch(err => {
      console.log('Error finding web3.', err);
    })
  }
  createPassportOnBlockchain(
    name,
    country,
    passportNumber,
    birthday,
    gender,
    placeOfBirth,
    issuingAuth
  ) {
    const contract = require('truffle-contract');
    const passportFactory = contract(PassportFactory);
    passportFactory.setProvider(this.state.web3.currentProvider);
    passportFactory
    .deployed()
    .then(passportFactory => {
      return passportFactory.createPassport(
        name,
        country,
        passportNumber,
        birthday,
        gender,
        placeOfBirth,
        issuingAuth
        ,
        {
          from: this.state.account,
          gas: 500000
        }
      )
    })
  }
  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">A t l a s</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {/* <NavItem href="/signup">Register</NavItem>
              <NavItem href="/login">Login</NavItem> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
}

export default App;