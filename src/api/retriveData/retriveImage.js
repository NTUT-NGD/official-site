import firebase from "firebase";

export async function retriveImage(img) {
  let url = firebase
    .storage()
    .ref("Games/" + img.name + "/Covert.png")
    .getDownloadURL();
  return url;
}
