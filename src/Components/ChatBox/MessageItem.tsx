import React, { FC } from "react";
import { Message } from "../../store/chat/types";

interface MessageItemOwnProps {
  message: string;
  id: string;
  displayUserName: boolean;
  currentUser?: string;
}
type MessageItemProps = MessageItemOwnProps & Message;
const MessageItem: FC<MessageItemProps> = (props: MessageItemProps) => {
  const addedClassName = props.currentUser === props.user ? "currentUser" : "";
  return (
    <div className="MessageRow">
      <div className={"MessageItem " + addedClassName}>
        {props.displayUserName ? <h5>{props.user}</h5> : ""}
        <div className="ChatMessage">
          <h3 key={props.id}>{props.message}</h3>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
