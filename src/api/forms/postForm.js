import axios from "axios";

export function postForm(url, formData) {
  console.log(formData);
  axios
    .post(url, formData)
    .then(function(response) {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}
