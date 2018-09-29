import React from "react";
import { Route, Switch } from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";

export default () =>
  <Switch>
    <Route path="/registration" exact component={RegistrationPage} />
  </Switch>;