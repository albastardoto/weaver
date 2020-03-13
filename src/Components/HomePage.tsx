import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import db from "../firestore/firestore";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {Room} from "./RoomPage";

type ownHomePageProps={
  setRoomData:(roomData:Room)=>void;
}

type HomePageProps= ownHomePageProps & RouteComponentProps<{}>;

class HomePage extends Component< HomePageProps,{}> {
  constructor(props:HomePageProps){
    super(props);
    this.createRoom= this.createRoom.bind(this);
  }



  public render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <h2>Enter room code or create a new room</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <input type="text" name="code"></input>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col md={3}>
            <Button block variant="primary">
              Go to your room
            </Button>
          </Col>
          <Col md={3}>
            <Button onClick={this.createRoom} block variant="primary">
              Create new room
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
  createRoom() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    db.collection("rooms")
      .doc(result)
      .set({
        code: result
      }).then(()=>{
        console.log("room created succesfully");
        this.props.setRoomData({name:result, code:result});
        this.props.history.push("/room");

      }).catch((error:any)=>{
        console.error("Error creating room: ",error);
      });
    return result;
  }

}
export default withRouter(HomePage);
