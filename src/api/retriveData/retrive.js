import firebase from "firebase";

export async function retrive(collection) {
  const snapshot = await firebase
    .firestore()
    .collection(collection)
    .get();
  return snapshot.docs.map(doc => doc.data());
}
