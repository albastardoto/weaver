import Firebase from "@firebase/firestore-types";
import firebase from "firebase";
import db from "../../firestore/firestore";
import { Status } from "../fetch";
import { AppThunk, store } from "../store";
import {
  ChatActionTypes,
  ChatFetchState,
  FETCH_MESSAGE,
  Message,
  SEND_MESSAGE,
} from "./types";

export function addMessage(newMessage: Message): ChatActionTypes {
  return {
    type: SEND_MESSAGE,
    payload: newMessage,
  };
}

export function setMessageFetch(fetchState: ChatFetchState): ChatActionTypes {
  return {
    type: FETCH_MESSAGE,
    payload: fetchState,
  };
}

export const sendMessage = (
  message: string,
  username: string
): AppThunk<void> => {
  return async (dispatch) => {
    dispatch(setMessageFetch({ status: Status.PENDING }));
    try {
      db.collection("rooms")
        .doc(store.getState().roomState.room.code)
        .collection("messages")
        .add({
          message: message,
          user: username,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      dispatch(setMessageFetch({ status: Status.SUCCESS }));
    } catch (error) {}
  };
};
let listening = false;
export const startChatListener = (): AppThunk<void> => {
  return function (dispatch) {
    if (listening) return;
    listening = true;
    let startTime = loadFromSessionStorage()?.timestamp;
    if (startTime === undefined) {
      startTime = Date.now() / 1000;
      saveToSessionStorage(startTime);
    }
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
                  timestamp: data.timestamp,
                })
              );
            }
          }
        });
      });
  };
};
function saveToSessionStorage(timestamp: number) {
  try {
    const serializedState = JSON.stringify({ timestamp: timestamp });
    sessionStorage.setItem("state", serializedState);
  } catch (error) {
    console.error(error);
  }
}
function loadFromSessionStorage() {
  try {
    const serializedState = sessionStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
  }
}
