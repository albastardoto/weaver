import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

const db = admin.firestore();

export const setActiveSuggestion = functions.firestore
  .document("rooms/{roomId}/suggestions/{suggestionId}")
  .onWrite((change, context) => {
    if (!change.before.exists && change.after.exists) {
      let foundActiveSuggestion = false;
      return db
        .collection("rooms")
        .doc(context.params.roomId)
        .collection("suggestions")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().active === true) foundActiveSuggestion = true;
          });
          if (foundActiveSuggestion)
            return change.after.ref.update({ active: false });
          return change.after.ref.update({ active: true });
        });
    } else if (!change.after.exists) {
      let foundActiveSuggestion = false;
      return db
        .collection("rooms")
        .doc(context.params.roomId)
        .collection("suggestions")
        .orderBy("timestamp")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().active === true) foundActiveSuggestion = true;
          });
          if (foundActiveSuggestion) return null;
          return querySnapshot.docs[0].ref.update({ active: true });
        });
    }
    return null;
  });

export const UpdateUserStatus = functions.database
  .ref("/status/{userId}")
  .onUpdate(async (change, context) => {
    const usersRef = db.collection("users");
    const eventStatus = change.after.val();
    const statusSnapshot = await change.after.ref.once("value");
    const status = statusSnapshot.val();
    if (status.last_changed > eventStatus.last_changed) {
      return null;
    }
    eventStatus.last_changed = new Date(eventStatus.last_changed);
    return db.runTransaction((transaction) => {
      return transaction
        .get(
          db.collection("users").doc(context.params.userId).collection("rooms")
        )
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            console.log(doc.id);
            transaction.set(
              db
                .collection("rooms")
                .doc(doc.id)
                .collection("users")
                .doc(context.params.userId),

              eventStatus,
              { merge: true }
            );
          });
          transaction.set(usersRef.doc(context.params.userId), eventStatus, {
            merge: true,
          });
        });
    });
  });
