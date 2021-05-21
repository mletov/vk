//WebSocket
//https://www.npmjs.com/package/express-ws
//https://flaviocopes.com/node-websockets/
//https://learn.javascript.ru/websockets


var WebSocketServer = new require('ws');

// подключённые клиенты
var clients = {};

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
  port: 3001,
  path: "/ws-test"
});
webSocketServer.on('connection', function(ws) {

  var id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on('message', function(message) {
    console.log('получено сообщение ' + message);

    for (var key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });

});


/*
app.ws("/ws-test", (req, res) => {

    console.log("New connection has opened!");

    ws.on('close', function() {
        console.log('The connection was closed!');
    });

    ws.on('message', function (message) {
        console.log('Message received: '+message);
    });

});    
*/

/*
//#region ExpressWebSocket
var expressWs = require('express-ws')(app);

var router = express.Router();
 
router.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
      let test = `TEST: ${msg}`; 
      ws.send(test);
  });
});
 
app.use("/ws-stuff", router);

//#endregion
*/
