import firebase from "firebase";
import store from "../../store";

export function register() {
  let db = firebase.firestore();
  let user = firebase.auth().currentUser;
  let docRef = db.collection("Users").doc(user.uid);
  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("Signin");
        db.collection("Users")
          .doc(user.uid)
          .update({
            lastSignin: new Date()
          });
      } else {
        db.collection("Users")
          .doc(user.uid)
          .set({
            UID: user.uid,
            isMember: false,
            name: user.displayName,
            email: user.email,
            parties: [],
            profile: "",
            lastSignin: new Date(),
            lastSend: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(function() {
            console.log("註冊成功");
          })
          .catch(function(error) {
            return error;
          });
      }
    })
    .catch(function(error) {
      console.log(error);
      return error;
    })
    .finally(function() {
      store.commit("setLoading", false);
    });
}
