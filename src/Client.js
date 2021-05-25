const { EventEmitter } = require("events");
const { ProtoDef, Serializer, Parser } = require('protodef')

class Client {
    constructor(remote, server) {


        this.Ip = remote.address;
        this.Port = remote.port;
        this.server = server;


    }


    Send(Buffer) {
        this.server.send(Buffer, this.Port, this.Ip, (err) => { });
    }

    Handle(data) {

    }

    Write() {

    }
}

class Player {
    constructor(XUID, Name, Positon) {


        this.XUID = XUID;
        this.Name = Name;
        this.Positon = Positon;


    }

}

module.exports = Client;