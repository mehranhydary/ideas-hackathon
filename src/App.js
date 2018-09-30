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
  }
  /* 
    Need to figure out how to read directly from react js... 
  */

  // readPassportName = () => {
  //   if(this.state.web3){
  //   passportFactory.setProvider(this.state.web3.currentProvider)
  //   passportFactory.deployed()
  //   .then(passportFactory => {
  //     return passportFactory.getPassportName(this.state.account)
  //     .then(result => {
  //       console.log('blockchain:', this.hex2a(result))
  //       return this.hex2a(result);
  //     })
  //     .catch(err => console.log('Error getting name!'))
  //   })
  //   .catch(err => console.log(err))
  //   } else {
  //     console.log("Waiting on state to load...")
  //   }
  // }

  readPassportName = () => {
    if(this.state.web3){
      passportFactory.setProvider(this.state.web3.currentProvider)
      passportFactory.deployed()
      .then(passportFactory => {
        return passportFactory.getPassportName(this.state.account)
        .then(result=> {
          console.log('blockchain: ', this.hex2a(result))
          return this.hex2a(result)
        })
        .catch(err => console.log('Error getting name!'))
      })
      .catch(err => console.log(err))
    } else {
      console.log('Waiting on state to load!')
    }
  }
  readPassportCountry = () => {
    if(this.state.web3){
      passportFactory.setProvider(this.state.web3.currentProvider)
      passportFactory.deployed()
      .then(passportFactory => {
        return passportFactory.getPassportCountry(this.state.account)
        .then(result=> {
          console.log('blockchain: ', this.hex2a(result))
          return this.hex2a(result)
        })
        .catch(err => console.log('Error getting name!'))
      })
      .catch(err => console.log(err))
    } else {
      console.log('Waiting on state to load!')
    }
  }
  readPassportNumber = () => {
    if(this.state.web3){
      passportFactory.setProvider(this.state.web3.currentProvider)
      passportFactory.deployed()
      .then(passportFactory => {
        return passportFactory.getPassportNumber(this.state.account)
        .then(result=> {
          console.log('blockchain: ', this.hex2a(result))
          return this.hex2a(result)
        })
        .catch(err => console.log('Error getting name!'))
      })
      .catch(err => console.log(err))
    } else {
      console.log('Waiting on state to load!')
    }
  }
  readPassportBirthday = () => {
    if(this.state.web3){
      passportFactory.setProvider(this.state.web3.currentProvider)
      passportFactory.deployed()
      .then(passportFactory => {
        return passportFactory.getPassportBirthday(this.state.account)
        .then(result=> {
          console.log('blockchain: ', this.hex2a(result))
          return this.hex2a(result)
        })
        .catch(err => console.log('Error getting name!'))
      })
      .catch(err => console.log(err))
    } else {
      console.log('Waiting on state to load!')
    }
  }
  readPassportGender = () => {
    if(this.state.web3){
      passportFactory.setProvider(this.state.web3.currentProvider)
      passportFactory.deployed()
      .then(passportFactory => {
        return passportFactory.getPassportGender(this.state.account)
        .then(result=> {
          console.log('blockchain: ', this.hex2a(result))
          return this.hex2a(result)
        })
        .catch(err => console.log('Error getting name!'))
      })
      .catch(err => console.log(err))
    } else {
      console.log('Waiting on state to load!')
    }
  }
  readPassportOrigin = () => {
    if(this.state.web3){
      passportFactory.setProvider(this.state.web3.currentProvider)
      passportFactory.deployed()
      .then(passportFactory => {
        return passportFactory.getPassportOrigin(this.state.account)
        .then(result=> {
          console.log('blockchain: ', this.hex2a(result))
          return this.hex2a(result)
        })
        .catch(err => console.log('Error getting name!'))
      })
      .catch(err => console.log(err))
    } else {
      console.log('Waiting on state to load!')
    }
  }
  readPassportIssuer = () => {
    if(this.state.web3){
      passportFactory.setProvider(this.state.web3.currentProvider)
      passportFactory.deployed()
      .then(passportFactory => {
        return passportFactory.getPassportIssuer(this.state.account)
        .then(result=> {
          console.log('blockchain: ', this.hex2a(result))
          return this.hex2a(result)
        })
        .catch(err => console.log('Error getting name!'))
      })
      .catch(err => console.log(err))
    } else {
      console.log('Waiting on state to load!')
    }
  }

  readLastTravelLocation = () => {
    if(this.state.web3){
      passportFactory.setProvider(this.state.web3.currentProvider)
      travelEntryFactory.setProvider(this.state.web3.currentProvider)
      passportFactory.deployed()
      .then(passportFactory => {
        return passportFactory.getPassportNumber(this.state.account)
        .then(result=> {
          // console.log('blockchain: ', this.hex2a(result))
          console.log(this.hex2a(result))
          travelEntryFactory.getLastTravelLocation(this.hex2a(result))
          .then(location => console.log(location))
          .catch(err => console.log(err))
          // return this.hex2a(result)
        })
        .catch(err => console.log('Error getting name!'))
      })
      .catch(err => console.log(err))
    } else {
      console.log('Waiting on state to load!')
    }
  }






  
   hex2a(hexString) {
    var hex = hexString.toString(); 
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
  render() {
    const { isLoaded, web3, account } = this.state;
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
              <NavItem href="/summary">Passport</NavItem>
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
                  // readPassport={this.readPassport}
                  isLoaded={this.state.isLoaded}
                  readPassportName={this.readPassportName}
                  readPassportCountry={this.readPassportCountry}
                  readPassportNumber={this.readPassportNumber}
                  readPassportBirthday={this.readPassportBirthday}
                  readPassportGender={this.readPassportGender}
                  readPassportOrigin={this.readPassportOrigin}
                  readPassportIssuer={this.readPassportIssuer}
                  readLastTravelLocation={this.readLastTravelLocation}
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