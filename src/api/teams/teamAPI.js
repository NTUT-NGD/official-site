import firebase from "firebase";

export async function doCreate(datas) {
  firebase
    .firestore()
    .collection("Projects")
    .add(datas)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
