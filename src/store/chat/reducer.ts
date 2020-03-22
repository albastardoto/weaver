import { ChatState, ChatActionTypes, SEND_MESSAGE } from "./types";

const initState: ChatState = {
  messages: []
};
export function chatReducer(state = initState, action: ChatActionTypes) {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
}
