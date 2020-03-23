import { Grid, IconButton, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { FC } from "react";

interface ChatInputProps {
  handleSendMessage: (event: React.FormEvent<any>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  owner: string;
  inputValue: string;
}
const ChatInput: FC<ChatInputProps> = (props: ChatInputProps) => {
  return (
    <Grid container alignItems="flex-end" direction="row" justify="flex-start">
      <form className="ChatForm" onSubmit={props.handleSendMessage}>
        <TextField
          className="ChatInput"
          id="chatboxInput"
          label="send a message"
          autoComplete="off"
          onChange={props.handleInputChange}
          value={props.inputValue}
        />
        <IconButton
          className="ChatButton"
          onSubmit={props.handleSendMessage}
          onClick={props.handleSendMessage}
        >
          <SendIcon />
        </IconButton>
      </form>
    </Grid>
  );
};

export default ChatInput;
