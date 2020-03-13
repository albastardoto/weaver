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
  measurementId: "G-FQ7JLGYW4X"
};
require("firebase/firestore");
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
export default db;
