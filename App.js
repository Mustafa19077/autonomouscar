const express = require("express");
const WebSocket = require("ws");
const http = require("http");

const DEVICES = [];
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection',(ws)=>{
    console.log("yeni bağlantı");
    DEVICES.push(ws);
    ws.on('message',(data)=>{
        const json = JSON.parse(data);
        const str = JSON.stringify(json);
        console.log("message : "+str);
        sendAll(str);
    });
    ws.on('close',()=>{
        console.log("Kullanıcı çıktı");
//        DEVICES.splice(ws,1);
    })
});

const PORT = 8000;
server.listen(PORT,()=>{
    console.log("Sunucu başladı");
})

const sendAll = (message)=>{
    for (var i=0; i < DEVICES.length; i++) {
        DEVICES[i].send(message);
     }
}

app.get('/',(req,res)=>{
    res.json("ÜMİT ÖZDAĞ REİSSSSSSSS");
});

app.get('/kullanicilar',(req,res)=>{
    const num = DEVICES.length;
    res.json(num);
});
