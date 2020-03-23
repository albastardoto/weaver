import { SET_ROOM, FETCH_ROOM, RoomState, RoomActionTypes } from "./types";

const initSate = { room: { code: "", name: "" } };

export const roomReducer = (
  state: RoomState = initSate,
  action: RoomActionTypes
) => {
  switch (action.type) {
    case SET_ROOM:
      return { ...state, room: { ...action.payload } };
    case FETCH_ROOM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
