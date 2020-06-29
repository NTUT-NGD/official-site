import firebase from "firebase";

export async function doCreate(datas) {
  firebase
    .firestore()
    .collection("Projects")
    .add(datas)
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
