const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 8081;

let connections = [];
let nicknames = [];

let number_of_connections = 0;

const broadcast_message = (message)=>{
    for(let id in connections){
        const socket = connections[id];
        socket.emit("new_message", message);
    }
};

const broadcast_n_clients = ()=>{
    for(let id in connections){
        const socket = connections[id];
        socket.emit("n_clients", number_of_connections);
    }
};

const emit_nickname = (socket) =>{
    socket.emit("nickname", nicknames[socket.id]);
}

io.on("connection", (socket)=>{
    connections[socket.id] = socket;
    nicknames[socket.id] = socket.id;
    emit_nickname(socket);
    number_of_connections++;
    broadcast_n_clients();
    //socket.emit("server-to-client", "Hello from server");
    console.log("client connected. number_of_connections: ", number_of_connections);
    socket.on("disconnect", (socket)=>{
        delete connections[socket.id];
        number_of_connections--;
        broadcast_n_clients();
        console.log("client disconnected. number_of_connections: ", number_of_connections);
        //
    });

    socket.on("send_message", (text)=>{
        const message = {
            nickname: nicknames[socket.id],
            text: text
        };
        broadcast_message(message);
    });

    socket.on("set_nickname", (nickname)=>{
        nicknames[socket.id] = nickname;
        emit_nickname(socket);
    });
    
});

app.use(express.static("public"));

server.listen(PORT);
