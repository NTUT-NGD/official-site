import config from "@/googleConfig.js";
import { retrive } from "@/api/calendar/retrive.js";

const gapi = window.gapi;

export function googleLogin() {
  let auth = null;
  gapi.load("client:auth2", config);
  gapi.load("auth2", function() {
    gapi.auth2.init(config).then(function(auth2) {
      Promise.resolve(window.gapi.auth2.getAuthInstance().signIn()).then(() => {
        retrive();
        console.log(auth2);
        auth = auth2;
      });
    });
  });
  return auth;
}
