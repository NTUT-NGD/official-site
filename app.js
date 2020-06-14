const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

var position = {
  x: 640 / 2,
  y: 480 / 2
};

Http.listen(3000, () => {
  console.log("Listening at :3000...");
});

Socketio.on("connection", socket => {
  socket.emit("position", position);
  socket.on("move", data => {
    let move = 20;
    switch (data) {
      case "left":
        position.x -= move;
        Socketio.emit("position", position);
        break;
      case "right":
        position.x += move;
        Socketio.emit("position", position);
        break;
      case "up":
        position.y -= move;
        Socketio.emit("position", position);
        break;
      case "down":
        position.y += move;
        Socketio.emit("position", position);
        break;
    }
  });
  socket.on("reset", () => {
    position.x = 640 / 2;
    position.y = 480 / 2;
    Socketio.emit("position", position);
  });
});
