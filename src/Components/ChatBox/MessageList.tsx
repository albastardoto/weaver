import React, { FC } from "react";
import { Message } from "../../store/chat/types";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: Message[];
}
const MessageList: FC<MessageListProps> = (props: MessageListProps) => {
  return (
    <div className="ChatList">
      <div>
        {props.messages
          .sort((a, b) => {
            return a.timestamp - b.timestamp;
          })
          .map((messageItem: Message) => {
            return (
              <MessageItem
                message={messageItem.message}
                user={messageItem.user}
                id={messageItem.id}
                timestamp={0}
                key={messageItem.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MessageList;
