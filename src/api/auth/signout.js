import firebase from "firebase";

export function signout() {
  firebase.auth().signOut();
}
