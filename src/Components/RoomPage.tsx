import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";
import { RouteProps, withRouter } from "react-router-dom";
import { createRoom } from "../store/room/actions";
import {
  getSearchList,
  startSuggestionsListener,
} from "../store/room/suggestions/actions";
import { RootState } from "../store/store";
import { updateSession, checkLogin } from "../store/system/actions";
import { SystemState } from "../store/system/types";
import Search from "./Suggestions/Search";
import VideoPlayer from "./Suggestions/Player/VideoPlayer";
import SidePanel from "./SidePanel";

import "./RoomPage.scss";
import { Suggestion } from "../store/room/suggestions/types";
import UsersList from "./Users/UsersList";
import { startChatListener } from "../store/chat/actions";

export interface RoomPageState {}

type RoomPageProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteProps;
class RoomPageComponent extends Component<RoomPageProps, RoomPageState> {
  constructor(props: RoomPageProps) {
    super(props);

    this.state = { userNameModalOpen: false };
  }
  componentDidMount() {
    let code = this.props.location!.pathname;
    let urlLength = code.length;
    code = code.substr(urlLength - 6, urlLength);
    if (this.props.roomData.code !== code) {
      if (this.props.roomData.code !== "") {
        sessionStorage.clear();
        this.props.updateSession({ loggedIn: false, userName: undefined });
      }
      this.props.getRoomInfo(code);
    }
  }
  componentWillReceiveProps(nextProps: RoomPageProps) {
    if (
      nextProps.roomData.code !== "" &&
      nextProps.roomData.code !== this.props.roomData.code
    ) {
      this.props.startSuggestionsListener();
      this.props.checkLogin();
      this.props.startChatListener();
    }
  }
  public render() {
    if (this.props.roomData.code !== "") {
      return (
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
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={9} lg={9}>
                <Search />
                <VideoPlayer
                  suggestion={this.props.suggestions.find(
                    (suggestion: Suggestion) => suggestion.active
                  )}
                />
              </Grid>
              <SidePanel suggestions={this.props.suggestions} />
            </Grid>
          </Grid>
          <UsersList users={this.props.systemState.users} />
        </Grid>
      );
    } else {
      return <h1>loading ...</h1>;
    }
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
  return {
    roomData: state.roomState.room,
    suggestions: state.suggestions.suggestions,
    systemState: state.system,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getRoomInfo: (code: string) => {
      dispatch(createRoom(code));
    },
    updateSession: (newSession: Partial<SystemState>) => {
      dispatch(updateSession(newSession));
    },
    startSuggestionsListener: () => {
      dispatch(startSuggestionsListener());
    },
    checkLogin: () => {
      dispatch(checkLogin());
    },
    startChatListener: () => {
      dispatch(startChatListener());
    },
  };
};
const RoomPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomPageComponent);
export default withRouter(RoomPage);
