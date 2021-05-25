const dgram = require("dgram");
const Client = require("./Client");
const { EventEmitter } = require("events");
const Utils = require("./utils");

class Server extends EventEmitter {
	constructor(Host, Port) {
        super();


        this.ClientList = {};
        this.Server = dgram.createSocket('udp4');
        this.GUID = Utils.MakeGUID();


        var me = this;


        this.Options = {
            Host,
            Port
        };


        this.Server.on('listening', () => {
            this.emit('listening', this.Host, this.Port);
        });


        this.Server.on('message', function (buffer, remote) {
            if (!Object.hasOwnProperty.call(me.ClientList, remote.address)) {
                me.ClientList[remote.address] = new Client(remote, me.Server);
            }
            
            var client = me.ClientList[remote.address];
            me.emit("connection", client);
            
        });


        this.Server.on('error', (e) => {
            me.emit('error', e)
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