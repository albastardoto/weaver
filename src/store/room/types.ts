import { ChatState } from "../chat/types";
import { FetchState } from "../fetch";

export interface Room {
  name: string;
  code: string;
}
export interface RoomState {
  room: Room;
  chat?: ChatState;
  fetchState: RoomFetchState;
}

export interface RoomFetchState extends FetchState {
  payload?: RoomState;
}
export const SET_ROOM = "SET_ROOM";
export const FETCH_ROOM = "FETCH_ROOM";

interface SetRoomAction {
  type: typeof SET_ROOM;
  payload: Room;
}
interface SetFetchingAction {
  type: typeof FETCH_ROOM;
  payload: RoomFetchState;
}

export type RoomActionTypes = SetRoomAction | SetFetchingAction;
