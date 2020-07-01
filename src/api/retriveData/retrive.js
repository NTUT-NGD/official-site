import firebase from "firebase";
import store from "../../store";

export async function retrive(collection) {
  const snapshot = await firebase
    .firestore()
    .collection(collection)
    .get();
  return snapshot.docs.map(doc => doc.data());
}
export async function retriveDoc(collection, id) {
  const snapshot = await firebase
    .firestore()
    .collection(collection)
    .doc(id)
    .get();
  store.commit("setSelectProject", await snapshot.data());
}
