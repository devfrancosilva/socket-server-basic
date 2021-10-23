const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  confugureSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();
    this.confugureSockets();
    this.server.listen(this.port, () => {
      console.log("Server corriendo en el puerto :8080");
    });
  }
}

module.exports = Server;
