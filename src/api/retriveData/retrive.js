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
  return await firebase
    .firestore()
    .collection(collection)
    .doc(id)
    .onSnapshot(function(doc) {
      store.commit("setSelectProject", doc.data());
    });
}
