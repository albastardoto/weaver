import { FetchState } from "../fetch";

export interface Message {
  user: string;
  message: string;
  timestamp: number;
  id: string;
}
export interface ChatState {
  messages: Message[];
}
export interface ChatFetchState extends FetchState {
  payload?: ChatState;
}

export const SEND_MESSAGE = "SEND_MESSAGE";
export const FETCH_MESSAGE = "FETCH_MESSAGE";

interface AddMessageAction {
  type: typeof SEND_MESSAGE;
  payload: Message;
}
interface SetFetchingAction {
  type: typeof FETCH_MESSAGE;
  payload: ChatFetchState;
}

export type ChatActionTypes = AddMessageAction | SetFetchingAction;
