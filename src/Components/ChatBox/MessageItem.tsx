import React, { FC } from "react";
import { Message } from "../../store/chat/types";

interface MessageItemOwnProps {
  message: string;
  id: string;
}
type MessageItemProps = MessageItemOwnProps & Message;
const MessageItem: FC<MessageItemProps> = (props: MessageItemProps) => {
  return (
    <h3 key={props.id} className="ChatMessage">
      {props.message}
    </h3>
  );
};

export default MessageItem;
