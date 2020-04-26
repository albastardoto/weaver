import { Grid } from "@material-ui/core";
import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../../store/chat/actions";
import { RootState } from "../../store/store";
import { updateSession } from "../../store/system/actions";
import { SystemState } from "../../store/system/types";
import "./ChatBox.css";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

export interface ChatBoxState {
  chatInputValue: string;
  usernameModalOpen: boolean;
  usernameValue: string;
}
interface IChatBoxProps extends React.Props<any> {}

type Props = IChatBoxProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class ChatBox extends Component<Props, ChatBoxState> {
  componentDidUpdate() {
    const chatList = document.getElementsByClassName("ChatList")[0];
    if (chatList !== undefined) {
      chatList.scrollTop = chatList.scrollHeight;
    }
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      chatInputValue: "",
      usernameModalOpen: false,
      usernameValue: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleUsernameClose = this.handleUsernameClose.bind(this);
    this.checkIfUserUpdate = this.checkIfUserUpdate.bind(this);
  }
  public render() {
    return (
      <Grid item xs={12} className="justify-content-center h-100">
        <Grid
          container
          onClick={this.checkIfUserUpdate}
          className="ChatBox SidePanelInner"
          direction="column"
        >
          <MessageList
            messages={this.props.chatState.messages}
            username={this.props.systemState.userName}
          />
          <ChatInput
            owner={"anonymous"}
            handleInputChange={this.handleInputChange}
            handleSendMessage={this.handleSendMessage}
            inputValue={this.state.chatInputValue}
          />
        </Grid>
      </Grid>
    );
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "chatInputValue") {
      this.checkIfUserUpdate();
    }
  }
  checkIfUserUpdate(): boolean {
    if (
      this.props.systemState.userName === undefined ||
      this.props.systemState.roomCode !== this.props.roomState.room.code
    ) {
      this.setState({ usernameModalOpen: true });
      return true;
    }
    return false;
  }
  handleSendMessage(event: React.FormEvent<any>) {
    event.preventDefault();
    this.props.sendMessage(
      this.state.chatInputValue,
      this.props.systemState.userName!
    );
    this.setState({ chatInputValue: "" });
  }
  handleUsernameClose(event?: React.FormEvent) {
    if (event) {
      event.preventDefault();
    }
    console.log("inside function ");
    if (event && this.state.usernameValue !== "") {
      this.props.updateSession({
        loggedIn: true,
        userName: this.state.usernameValue,
        roomCode: this.props.roomState.room.code,
        userId: this.props.systemState.userId,
      });
    }
    this.setState({ usernameModalOpen: false });
  }
}
const mapStateToProps = (state: RootState) => ({
  chatState: state.chat,
  systemState: state.system,
  roomState: state.roomState,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    sendMessage: (message: string, username: string) => {
      dispatch(sendMessage(message, username));
    },
    updateSession: (newSession: Partial<SystemState>) => {
      dispatch(updateSession(newSession));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
