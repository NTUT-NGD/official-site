import firebase from "firebase";

export function signin() {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().languageCode = "zh-TW";
  provider.setCustomParameters({
    hd: "ntut.org.tw"
  });
  firebase.auth().signInWithRedirect(provider);
}

export async function getAuthState(user) {
  const snapshot = await firebase
    .firestore()
    .collection("Users")
    .where("UID", "==", user.uid)
    .get();
  return snapshot.docs.map(doc => doc.data());
}
