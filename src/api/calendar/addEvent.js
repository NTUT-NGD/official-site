import firebase from "firebase";

export async function addEvent(event) {
  console.log(event);
  firebase
    .firestore()
    .collection("Calendar")
    .add(event)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
