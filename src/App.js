import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
// Routing files
import { Route, Switch } from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";
import EnterIdPage from "./components/EnterIdPage";
import TravelEntryPage from "./components/TravelEntryPage";
import SummaryPage from './components/SummaryPage';
// Blockchain files
import getWeb3 from './lib/getWeb3';
import PassportFactory from '../build/contracts/PassportFactory.json';
import TravelEntryFactory from '../build/contracts/TravelEntryFactory.json';
// Blockchain initializers
const contract = require('truffle-contract');
const passportFactory = contract(PassportFactory);
const travelEntryFactory = contract(TravelEntryFactory);
const moment = require('moment');
// Read from blockchain 
const abiDecoder = require('abi-decoder');
const passportFactoryAbi = PassportFactory.abi;
const travelEntryFactoryAbi = TravelEntryFactory.abi;

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
        account: results.web3.eth.accounts[0],
        isLoaded: true
      })
      console.log(this.state.web3, this.state.account)
      passportFactory.setProvider(this.state.web3.currentProvider)
      travelEntryFactory.setProvider(this.state.web3.currentProvider)
    })
    .catch(err => {
      console.log('Error finding web3.', err);
    })
  }
  createPassportOnBlockchain = (
    name,
    country,
    passportNumber,
    birthday,
    gender,
    placeOfBirth,
    issuingAuth
  ) => {
    
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
        issuingAuth,
        {
          from: this.state.account,
          // from: '0x6f3224e147090f0ffbc79bfd8bf36a52dad34cfb',
          gas: 500000
        }
      )
    })
    .then(() => {
      window.location.replace('http://localhost:3000/summary')
    })
    .catch(err => console.log(err))
  }
  createTravelEntryOnBlockchain = (
    location,
    entryDate
  ) => {
    console.log(location, entryDate, this.state.account);
    travelEntryFactory
    .deployed()
    .then(travelEntryFactory => {
      return travelEntryFactory.createTravelHistory(
        location,
        moment(entryDate).unix(),
        this.state.account,
        {
          from: this.state.account,
          gas: 500000
        }
      )
    })
    .then(() => {
      window.location.replace('http://localhost:3000/summary')
    })
  }
  updateTravelEntryOnBlockchain = (
    exitDate
  ) => {

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
    .then(() => {
      window.location.replace('http://localhost:3000/summary')
    })
  }
  /* 
    Need to figure out how to read directly from react js... 
  */
  readPassportCreationTransaction = (tx_id) => {
    if(this.state.web3) {
      return this.getTransaction(tx_id)
    } else {
        console.log('Web3 is loading...')
    }
  }
  getTransaction = (tx_id) => {
    return new Promise((resolve, reject) => {
      this.state.web3.eth.getTransaction(tx_id, function(err, result){
        if(err) reject(err);
        console.log(result);
        resolve(result);
      })
    })
  }
  passportDecoder = tx => {
    abiDecoder.addABI(passportFactoryAbi);
    console.log(abiDecoder.decodeMethod(tx.input))
    return abiDecoder.decodeMethod(tx.input)
  }
  readTravelEntryCreationTransaction = (tx_id) => {
    abiDecoder.addABI(travelEntryFactoryAbi)
    getWeb3
    .then(results => {
      results.web3.eth.getTransaction(tx_id, function(err, result){
        if (err) console.log('Error reading the blockchain')
        return result
      })      
    })
  }
  render() {
    const { isLoaded, web3, account } = this.state;
    console.log(this.readPassportCreationTransaction('0xb3aa23a2892ccd01f343dad097346aee271bbbdff61e104b291dd9ced021509b'))
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
              <NavItem href="/entrypage">Travel!</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
          <Switch>
            <Route
             render={props =>  (
               <RegistrationPage 
                {...props} 
                createPassportOnBlockchain={this.createPassportOnBlockchain}
               />
             )}
             path="/registration" 
             exact 
             />
            <Route
              path="/scan" exact component={EnterIdPage}
            />
            <Route
              render={props =>  (
                <SummaryPage {...props} 
                  readPassportCreationTransaction={this.readPassportCreationTransaction}
                  isLoaded={this.state.isLoaded}
                />
              )}
              path="/summary" 
              exact
            />
            <Route
              render={props =>  (
                <TravelEntryPage {...props} createTravelEntryOnBlockchain={this.createTravelEntryOnBlockchain}/>
              )}
              path="/entrypage" 
              exact 
             />
          </Switch>
      </div>
    );
  }
}

export default App;