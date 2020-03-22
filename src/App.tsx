import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Components/HomePage";
import RoomPage from "./Components/RoomPage";
import { RoomState } from "./store/room/types";

interface AppState {
  authenticated: boolean;
  room?: RoomState;
}
export default class App extends Component<{}, AppState> {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
          <Route path="/room/:id" children={<RoomPage />} />
        </Switch>
      </Router>
    );
  }
}
