import config from "@/googleConfig.js";

export async function retrive() {
  let gapi = window.gapi;
  gapi.load("client", config);
  gapi.load("client", async () => {
    gapi.client.load("calendar", "v3", async () => {
      gapi.client.calendar.events
        .list({
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: "startTime"
        })
        .then(response => {
          console.log(response);
        });
    });
  });
}
