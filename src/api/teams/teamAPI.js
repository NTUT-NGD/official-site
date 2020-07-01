import firebase from "firebase";

export function doCreate(datas) {
  let db = firebase.firestore().collection("Projects");
  db.add(datas)
    .then(ref => {
      db.doc(ref.id).update({
        id: ref.id
      });
      addNewParty(datas.members[0].uid, ref.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

export function addNewParty(userUID, id) {
  let user = firebase
    .firestore()
    .collection("Users")
    .doc(userUID);
  user.update({
    parties: firebase.firestore.FieldValue.arrayUnion(id)
  });
}

export async function getMembers(id) {
  const snapshot = await firebase
    .firestore()
    .collection("Projects")
    .doc(id)
    .get();
  return snapshot.data().applicants;
}

export async function doApply(id, user, intro) {
  let ref = firebase
    .firestore()
    .collection("Projects")
    .doc(id);
  ref.update({
    applicants: firebase.firestore.FieldValue.arrayUnion({
      user: user[0].displayName,
      uid: user[0].uid,
      intro: intro,
      email: user[0].email
    })
  });
}

export function doAgree(id, user) {
  let ref = firebase
    .firestore()
    .collection("Projects")
    .doc(id);
  ref.update({
    applicants: firebase.firestore.FieldValue.arrayRemove({
      user: user.user,
      uid: user.uid,
      email: user.email,
      intro: user.intro
    })
  });
  ref.update({
    members: firebase.firestore.FieldValue.arrayUnion({
      name: user.user,
      uid: user.uid,
      email: user.email,
      job: "member"
    })
  });
  addNewParty(user.uid, id);
}

export function doDisagree(id, user) {
  let ref = firebase
    .firestore()
    .collection("Projects")
    .doc(id);
  ref.update({
    applicants: firebase.firestore.FieldValue.arrayRemove({
      user: user.user,
      uid: user.uid,
      email: user.email,
      intro: user.intro
    })
  });
}
