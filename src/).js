import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
// Routing files
import { Route, Switch } from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";
import EnterIdPage from "./components/EnterIdPage";
import TravelEntryPage from "./components/TravelEntryPage";
// Blockchain files
import getWeb3 from './lib/getWeb3';
import PassportFactory from '../build/contracts/PassportFactory.json';
import TravelEntryFactory from '../build/contracts/TravelEntryFactory.json';
// Blockchain initializers
const contract = require('truffle-contract');
const passportFactory = contract(PassportFactory);
const travelEntryFactory = contract(TravelEntryFactory);

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
      console.log(this.state.web3)
      console.log(passportFactory.setProvider(this.state.web3.currentProvider));
      travelEntryFactory.setProvider(this.state.web3.currentProvider);
      travelEntryFactory.setProvider(this.state.web3.currentProvider);

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
  createTravelEntryOnBlockchain(
    location,
    entryDate
  ) {

    travelEntryFactory
    .deployed()
    .then(travelEntryFactory => {
      return travelEntryFactory.createTravelHistory(
        location,
        entryDate,
        this.state.account,
        {
          from: this.state.account,
          gas: 500000
        }
      )
    })
  }
  updateTravelEntryOnBlockchain(
    exitDate
  ) {

    travelEntryFactory
    .deployed()
    .then(travelEntryFactory => {
      return travelEntryFactory.updateTravelHistory(
        exitDate,
        this.state.account,
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
              <NavItem href="/registration">Register</NavItem>
              <NavItem href="/scan">Welcome</NavItem>
              <NavItem href="/entry">Travel!</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
          <Switch>
            <Route
             render={props =>  (
               <RegistrationPage {...props} createPassportOnBlockchain={this.createPassportOnBlockchain}/>
             )}
             path="/registration" 
             exact 
            //  component={RegistrationPage} 
             />
            <Route
             path="/scan" exact component={EnterIdPage} />
            <Route
              render={props =>  (
                <TravelEntryPage {...props} createTravelEntryOnBlockchain={this.createTravelEntryOnBlockchain}/>
              )}
              path="/entrypage" 
              exact 
              // component={TravelEntryPage} 
             />
          </Switch>
      </div>
    );
  }
}

export default App;