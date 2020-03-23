import Grid from "@material-ui/core/Grid";
import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";
import { Room, RoomState } from "../store/room/types";
import ChatBox from "./ChatBox/ChatBox";
import Suggestion, { SuggestionType } from "./Suggestion";
import { createRoom } from "../store/room/actions";
import { withRouter, RouteProps } from "react-router-dom";
import { Button, Container } from "@material-ui/core";
import { getSearchList } from "../store/room/suggestions/actions";
import Search from "./Suggestions/Search";
import { RootState } from "../store/store";

export interface RoomPageProps extends RouteProps {
  roomData: Room;
  getRoomInfo: (code: string) => void;
}
export interface RoomPageState {
  suggestions?: [SuggestionType];
}

class RoomPageComponent extends Component<RoomPageProps, RoomPageState> {
  constructor(props: RoomPageProps) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    if (this.props.roomData.code === "") {
      let code = this.props.location!.pathname;
      let urlLength = code.length;
      code = code.substr(urlLength - 6, urlLength);
      this.props.getRoomInfo(code);
    }
  }

  public render() {
    return (
      <Container>
        <Grid
          container
          spacing={0}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} className="text-justify">
            <h1 className="text-center paddin p-3">
              {this.props.roomData?.code}
            </h1>
          </Grid>
          <Grid item xs={8}>
            <Search />
            {this.state.suggestions?.map(suggestion => {
              return <Suggestion data={suggestion} />;
            })}
          </Grid>
          {this.props.roomData?.code ? <ChatBox /> : ""}
        </Grid>
      </Container>
    );
  }
  private submit(e: any) {
    console.log("hey");
    console.log(e);
  }
  private search() {
    getSearchList("");
  }
}
const mapStateToProps = (state: RootState) => {
  return { roomData: state.roomState.room };
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getRoomInfo: (code: string) => {
      dispatch(createRoom(code));
    }
  };
};
const RoomPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomPageComponent);
export default withRouter(RoomPage);
