import React, { FC } from "react";
import { Message } from "../../store/chat/types";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: Message[];
  username?: string;
}
const MessageList: FC<MessageListProps> = (props: MessageListProps) => {
  let lastUsername = "";
  return (
    <div className="ChatList">
      {props.messages
        .sort((a, b) => {
          return a.timestamp - b.timestamp;
        })
        .map((messageItem: Message) => {
          const sameUsername = lastUsername === messageItem.user;
          lastUsername = messageItem.user;
          return (
            <MessageItem
              message={messageItem.message}
              user={messageItem.user}
              id={messageItem.id}
              timestamp={0}
              key={messageItem.id}
              displayUserName={
                !(sameUsername || messageItem.user === props.username)
              }
              currentUser={props.username}
            />
          );
        })}
    </div>
  );
};

export default MessageList;
