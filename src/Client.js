const { EventEmitter } = require("events");


class Client {
    constructor(remote,server) {
        this.Ip = remote.address;
        this.Port = remote.port;
        this.server = server;
    }
    Send(Buffer) {
        this.server.send(Buffer, this.Port, this.Ip, (err) => { });
    }
}

module.exports = Client;