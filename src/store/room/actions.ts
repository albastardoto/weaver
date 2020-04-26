import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import db from "../../firestore/firestore";
import { Status } from "../fetch";
import { AppThunk, RootState } from "../store";
import {
  FETCH_ROOM,
  Room,
  RoomActionTypes,
  RoomFetchState,
  SET_ROOM,
} from "./types";

export function setRoom(room: Room): RoomActionTypes {
  return {
    type: SET_ROOM,
    payload: room,
  };
}
export function setRoomFetch(fetchState: RoomFetchState): RoomActionTypes {
  return {
    type: FETCH_ROOM,
    payload: fetchState,
  };
}
export const createRoom = (
  code: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    dispatch(setRoomFetch({ status: Status.PENDING }));
    try {
      const response = await db.collection("rooms").doc(code).set({
        code: code,
      });
      dispatch(setRoom({ code, name: code }));
      dispatch(setRoomFetch({ status: Status.SUCCESS }));
    } catch (error) {
      dispatch(setRoomFetch({ status: Status.FAIL, error }));
      console.error("Error creating room: ", error);
    }
  };
};
export const getRoom = (code: string): AppThunk<void> => {
  return async (dispatch) => {
    dispatch(setRoomFetch({ status: Status.PENDING }));
    try {
      const doc = await db.collection("rooms").doc(code).get();
      if (doc.exists) {
        dispatch(setRoom(doc.data));
        dispatch(setRoomFetch({ status: Status.SUCCESS }));
      } else {
        throw doc;
      }
    } catch (error) {
      dispatch(setRoomFetch({ status: Status.FAIL }));
      console.error(error);
    }
  };
};
