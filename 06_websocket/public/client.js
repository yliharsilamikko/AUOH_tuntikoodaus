let socket = io();

socket.on("server-to-client", (message)=>{
    const messages = document.getElementById("messages");
    messages.innerHTML += message + "<br>";
    //console.log(message);
    //socket.emit("client-to-server", "Hello from client");
});

const send_message = ()=>{
    const message_input = document.getElementById("message_input");
    socket.emit("client-to-server", message_input.value);
    message_input.value = "";
};