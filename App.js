const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const { send } = require("process");

const DEVICES = [];
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection',(ws)=>{
    DEVICES.push(ws);
    ws.on('message',(data)=>{
        sendAll(data);
    })
    ws.on('close',(ws)=>{
        DEVICES.splice(ws,1);
    })
});

const PORT = 8000;
server.listen(PORT,()=>{
    console.log("Sunucu başladı");
})

const sendAll = (message)=>{
    for (var i=0; i < DEVICES.length; i++) {
        DEVICES[i].send(message);  broadcast messages to everyone including sender
     }
}

 app.get('/',(req,res)=>{
      res.send("Merhaba burası Profff'un çöplüğü");
     });
})
