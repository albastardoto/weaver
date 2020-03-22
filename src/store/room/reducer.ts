import { SET_ROOM, FETCH_ROOM } from "./types";

const initSate = {};

export const roomReducer = (state: any = initSate, action: any) => {
  switch (action.type) {
    case SET_ROOM:
      return { ...state, ...action.payload };
    case FETCH_ROOM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
