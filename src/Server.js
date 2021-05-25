const dgram = require("dgram");
const Client = require("./Client");
const { EventEmitter } = require("events");

class Server extends EventEmitter {
	constructor(Host, Port) {
        super();
        this.ClientList = {};
        var _ClientList = {};
        this.Server = dgram.createSocket('udp4');
        var _Server = this.Server;
        var me = this;
        this.Options = {
            Host,
            Port
        };
        this.Server.on('listening', () => {
            this.emit('listening', this.Host, this.Port);
        });
        this.Server.on('message', function (buffer, remote) {
            if (!Object.hasOwnProperty.call(_ClientList, remote.address)) {
                _ClientList[remote.address] = new Client(remote, _Server);
            }
            
            var client = _ClientList[remote.address];
            me.emit("connection", client);
            
        });
    }
    Start() {
        this.Server.bind(this.Options.Port, this.Options.Host);
    }
    Stop() {
        this.Server.close();
    }
}

module.exports = Server;