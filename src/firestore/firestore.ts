import { DocumentSnapshot, QuerySnapshot } from "@firebase/firestore-types";
import { Ref, Dispatch } from "react";
import { updateSession } from "../store/system/actions";

const firebase = require("firebase");
// Required for side-effects
const firebaseConfig = {
  apiKey: "AIzaSyCnxlMwUuG7J-szwquDcevdtnfK0eS8Xvo",
  authDomain: "soundpoll.firebaseapp.com",
  databaseURL: "https://soundpoll.firebaseio.com",
  projectId: "soundpoll",
  storageBucket: "soundpoll.appspot.com",
  messagingSenderId: "835834136362",
  appId: "1:835834136362:web:66991906b68a759e44c053",
  measurementId: "G-FQ7JLGYW4X",
};
require("firebase/firestore");
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
export const auth = firebase.auth();
export default db;

export const isOfflineForFirestore = {
  state: "offline",
  last_changed: firebase.firestore.FieldValue.serverTimestamp(),
};

export const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
export const isOnlineForFirestore = {
  state: "online",
  last_changed: firebase.firestore.FieldValue.serverTimestamp(),
};
export const LOCAL = firebase.auth.Auth.Persistence.LOCAL;

export const startAuthListener = (dispatch: Dispatch<any>) => {
  let connected = false;
  auth.onAuthStateChanged((user: any) => {
    if (user) {
      if (!connected) {
        connected = true;
        connect(auth.currentUser.uid);
      }
      const username = user.displayName ? user.displayName : undefined;
      dispatch(
        updateSession({
          userId: user.uid,
          loggedIn: true,
          userName: username,
        })
      );
    } else {
      console.log("no user");
      dispatch(
        updateSession({
          userId: undefined,
          loggedIn: false,
          userName: undefined,
        })
      );
    }
  });
};

function connect(uid: string) {
  console.log("connnecting");
  const userStatusRef = firebase.database().ref("/status/" + uid);
  firebase
    .database()
    .ref(".info/connected")
    .on("value", (snapshot: any) => {
      if (snapshot.val() == false) {
        return;
      }
      userStatusRef
        .onDisconnect()
        .set({
          active: false,
          last_changed: firebase.database.ServerValue.TIMESTAMP,
        })
        .then(() => {
          userStatusRef.set({
            active: true,
            last_changed: firebase.database.ServerValue.TIMESTAMP,
          });
        });
    });
}
