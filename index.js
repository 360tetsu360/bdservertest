const Server = require("./src/Server");
const server = new Server("localhost", 19132);


server.on('listening', function () {

});

server.on("connection", (client) => {
    console.log(Object.keys(server.ClientList).length);
});
server.Start();