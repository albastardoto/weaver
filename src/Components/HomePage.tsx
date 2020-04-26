import { Button, Grid, Container, Paper, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { createRoom } from "../store/room/actions";

import "./HomePage.css";

type ownHomePageProps = {
  createRoom: (code: string) => void;
};

type HomePageProps = ownHomePageProps & RouteComponentProps<{}>;

class HomePage extends Component<HomePageProps, {}> {
  constructor(props: HomePageProps) {
    super(props);
    this.startCreateRoom = this.startCreateRoom.bind(this);
  }
  public render() {
    return (
      <Container className="HomePage">
        <Paper elevation={3} className="main">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <h2>Enter room code or create a new room</h2>
            </Grid>
            <Grid item xs={12}>
              <TextField className="align-center" name="code"></TextField>
            </Grid>
            <Grid container direction="row" justify="center" spacing={3}>
              <Grid item>
                <Button
                  onClick={this.goToRoom.bind(this)}
                  variant="contained"
                  color="primary"
                >
                  Go to your room
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.startCreateRoom.bind(this)}
                >
                  Create new room
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
  startCreateRoom() {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.props.history.push("/room/" + result);
    this.props.createRoom(result);
  }
  goToRoom() {
    console.log("go to room");
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    createRoom: (code: string) => {
      dispatch(createRoom(code));
    },
  };
};
const connector = connect(null, mapDispatchToProps);
export default connector(withRouter(HomePage));
