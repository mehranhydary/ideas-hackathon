import React from "react";
import { Route, Switch } from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";
import EnterIdPage from "./components/EnterIdPage";
import TravelEntryPage from "./components/TravelEntryPage";

export default () =>
  <Switch>
    <Route path="/registration" exact component={RegistrationPage} />
    <Route path="/scan" exact component={EnterIdPage} />
    <Route path="/entrypage" exact component={TravelEntryPage} />
  </Switch>;