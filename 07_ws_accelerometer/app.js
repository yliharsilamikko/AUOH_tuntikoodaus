const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 8081;
let connections = [];
const broadcast_sensor_data = (data)=>{
    for(let id in connections){
        const connection = connections[id];
        connection.emit("sensor_updated", data);
    }
};

let current_data = {
    x:0,
    y:0,
    z:0,
}
const smooth_data = (data)=>{
    let delta_x = data.x - current_data.x;
    let delta_y = data.y - current_data.y;
    let delta_z = data.z - current_data.z;
    current_data.x += delta_x * 0.1;
    current_data.y += delta_y * 0.1;
    current_data.z += delta_z * 0.1;
    return current_data;
};



io.on("connection", (socket)=>{
    connections[socket.id] = socket;
    console.log("connected");

    socket.on("disconnect", (socket)=>{
        delete connections[socket.id];
        console.log("disconnected");
    });

    socket.on("sensor_data", (data)=>{
        data = smooth_data(data);
        broadcast_sensor_data(data);
        console.log(data);
    });
});

app.use(express.static("public"));

server.listen(PORT);
console.log("Server listening port: ", PORT);
