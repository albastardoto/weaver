import { AppThunk, store } from "../store";
import {
  SystemActionTypes,
  SystemState,
  UPDATE_SESSION,
  UserStatus,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
} from "./types";
import db, {
  auth,
  timeStamp,
  startAuthListener,
  LOCAL,
} from "../../firestore/firestore";
import { createAction } from "@reduxjs/toolkit";
import { QuerySnapshot } from "@firebase/firestore-types";
import { SET_SUGGESTION_FETCH } from "../room/suggestions/types";

export function updateSession(
  newSession: Partial<SystemState>
): SystemActionTypes {
  return {
    type: UPDATE_SESSION,
    payload: newSession,
  };
}
export const addUser = createAction<UserStatus>(ADD_USER);
export const updateUser = createAction<UserStatus>(UPDATE_USER);
export const deleteUser = createAction<string>(DELETE_USER);

let authListenerActive = false;
export const checkLogin = (): AppThunk<void> => {
  let currentUser = auth.currentUser;
  return async (dispatch) => {
    const roomCode = store.getState().roomState.room.code;
    if (!authListenerActive) {
      authListenerActive = true;
      let userStatusFirestoreRef = db
        .collection("rooms")
        .doc(roomCode)
        .collection("users");
      if (auth.currentUser) {
        setOnline();
      }
      //auth listener
      startAuthListener(dispatch);
      //user listener
      userStatusFirestoreRef.onSnapshot((querySnapshot: QuerySnapshot) => {
        querySnapshot.docChanges().forEach(function (change) {
          if (change.type === "removed") {
            return dispatch(deleteUser(change.doc.id));
          }
          const data = change.doc.data();
          let user = {
            id: change.doc.id,
            active: data.active,
            last_changed: data.last_changed?.toDate(),
            displayName: data.displayName,
          };
          if (change.type === "added") {
            dispatch(addUser(user));
          }
          if (change.type === "modified") {
            dispatch(updateUser(user));
          }
        });
      });
      //
    }
    try {
      if (currentUser === null) {
        auth.setPersistence(LOCAL).then(async () => {
          auth.signInAnonymously().then(() => {
            currentUser = auth.currentUser;
            setOnline();
          });
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};
function setOnline() {
  const roomCode = store.getState().roomState.room.code;
  db.collection("rooms")
    .doc(roomCode)
    .collection("users")
    .doc(auth.currentUser?.uid)
    .set(
      {
        active: true,
        last_changed: timeStamp(),
        displayName: auth.currentUser?.displayName,
      },
      { merge: true }
    );
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .collection("rooms")
    .doc(roomCode)
    .set({});
}
export const setDisplayName = (name: string): AppThunk<void> => {
  return async function (dispatch) {
    try {
      auth.currentUser
        ?.updateProfile({
          displayName: name,
        })
        .then(() => {
          db.collection("rooms")
            .doc(store.getState().roomState.room.code)
            .collection("users")
            .doc(auth.currentUser?.uid)
            .set({ displayName: name }, { merge: true });
        })
        .then(() => {
          dispatch(
            updateSession({
              userName: name,
              roomCode: store.getState().roomState.room.code,
            })
          );
        });
    } catch (e) {
      console.error(e);
    }
  };
};
