import Firebase, {
  DocumentSnapshot,
  DocumentReference
} from "@firebase/firestore-types";
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

export function setFetch(fetchState: ChatFetchState): ChatActionTypes {
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
    dispatch(setFetch({ status: Status.PENDING }));
    try {
      const result = await db
        .collection("rooms")
        .doc(store.getState().room.code)
        .collection("messages")
        .add({
          message: message,
          user: username,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      dispatch(setFetch({ status: Status.SUCCESS }));
    } catch (error) {}
  };
};
export const startChatListener = (): AppThunk<void> => {
  return function(dispatch) {
    db.collection("rooms")
      .doc(store.getState().room.code)
      .collection("messages")
      .onSnapshot((querySnapshot: Firebase.QuerySnapshot) => {
        querySnapshot.docChanges().forEach((change: any) => {
          console.log(change.type);
          if (change.type === "modified") {
            const data = change.doc.data();
            if (change.doc.metadata.hasPendingWrites) {
              return;
            }
            if (data) {
              dispatch(
                addMessage({
                  id: data.id,
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
