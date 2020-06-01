import axios from "axios";

export function contact(formData) {
  console.log(formData);
  let url =
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfQ30GpXUP0PaLdu-KDquuLB_NNcJeVa8siFMybIwAnfvcs7g/formResponse";
  axios
    .post(url, formData)
    .then(function(response) {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}
