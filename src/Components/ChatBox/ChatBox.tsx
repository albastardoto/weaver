import { connect } from "react-redux";
import MessageList from "./MessageList";
import { RootState } from "../../store/store";

import React, { Component, Dispatch } from "react";
import ChatInput from "./ChatInput";

import "./ChatBox.css";
import { Grid } from "@material-ui/core";
import { startChatListener, sendMessage } from "../../store/chat/actions";

export interface ChatBoxState {
  inputValue: string;
}
interface IChatBoxProps extends React.Props<any> {}

type Props = IChatBoxProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class ChatBox extends Component<Props, ChatBoxState> {
  componentWillMount() {
    this.props.startChatListener();
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }
  public render() {
    return (
      <Grid container className="ChatBox">
        <MessageList messages={this.props.chatState.messages} />
        <ChatInput
          owner={"anonymous"}
          handleInputChange={this.handleInputChange}
          handleSendMessage={this.handleSendMessage}
          inputValue={this.state.inputValue}
        />
      </Grid>
    );
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputValue: event.target.value
    });
  }
  handleSendMessage(event: React.FormEvent<any>) {
    event.preventDefault();
    this.props.sendMessage(this.state.inputValue, "me");
    this.setState({ inputValue: "" });
  }
}
const mapStateToProps = (state: RootState) => ({
  chatState: state.chat
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    startChatListener: () => {
      dispatch(startChatListener());
    },
    sendMessage: (message: string, username: string) => {
      dispatch(sendMessage(message, username));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
