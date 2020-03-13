import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Components/HomePage";
import RoomPage from "./Components/RoomPage";
type MainContext = {
  authenticated: boolean;
  room: {
    name: string;
    code: string;
  };
};
type room ={
  name:string;
  code:string;
}
interface AppState{
  authenticated:boolean;
  room?:room;
}
export default class App extends Component<{},AppState> {
  constructor(){
    super({});
    this.setRoomData=this.setRoomData.bind(this);
    this.state={
      authenticated:false,
      room:undefined
    }

  }
  setRoomData(roomData:room){
    this.setState({
      room:{
        name:roomData.name,
        code:roomData.code
      }
    })
  }
  render() {
    return (
        <Router>
          <div className="App App-header">
            <Switch>
              <Route exact path="/">
                <HomePage setRoomData={this.setRoomData}></HomePage>
              </Route>
              <Route exact path="/Room">
                <RoomPage roomData={this.state.room} ></RoomPage>
              </Route>
            </Switch>
          </div>
        </Router>
    );
  }
}

