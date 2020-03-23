import Firebase from "@firebase/firestore-types";
import db from "../../firestore/firestore";
import { Status } from "../fetch";
import { AppThunk, store } from "../store";
import {
  ChatActionTypes,
  ChatFetchState,
  FETCH_MESSAGE,
  Message,
  SEND_MESSAGE
} from "./types";

const firebase = require("firebase");
export function addMessage(newMessage: Message): ChatActionTypes {
  return {
    type: SEND_MESSAGE,
    payload: newMessage
  };
}

export function setMessageFetch(fetchState: ChatFetchState): ChatActionTypes {
  return {
    type: FETCH_MESSAGE,
    payload: fetchState
  };
}

export const sendMessage = (
  message: string,
  username: string
): AppThunk<void> => {
  return async dispatch => {
    dispatch(setMessageFetch({ status: Status.PENDING }));
    try {
      const result = await db
        .collection("rooms")
        .doc(store.getState().roomState.room.code)
        .collection("messages")
        .add({
          message: message,
          user: username,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      dispatch(setMessageFetch({ status: Status.SUCCESS }));
    } catch (error) {}
  };
};
export const startChatListener = (): AppThunk<void> => {
  return function(dispatch) {
    const startTime = Date.now() / 1000;
    db.collection("rooms")
      .doc(store.getState().roomState.room.code)
      .collection("messages")
      .onSnapshot((querySnapshot: Firebase.QuerySnapshot) => {
        querySnapshot.docChanges().forEach((change: any) => {
          if (change.type === "modified" || change.type === "added") {
            const data = change.doc.data();
            if (change.doc.metadata.hasPendingWrites) {
              return;
            }
            if (data.timestamp.seconds <= startTime) {
              return;
            }

            if (data) {
              dispatch(
                addMessage({
                  id: change.doc.id,
                  message: data.message,
                  user: data.user,
                  timestamp: data.timestamp
                })
              );
            }
          }
        });
      });
  };
};
