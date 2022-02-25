let socket = io();

socket.on("new_message", (message)=>{
    const messages = document.getElementById("messages");

    const nickname = message.nickname;
    const text = message.text;

    messages.innerHTML += "<b>" + nickname + ": </b>" + text + "<br>";
});

socket.on("n_clients", (n_clients)=>{
    const element = document.getElementById("n_clients");
    element.innerHTML = "Number of clients: " + n_clients;
});

socket.on("nickname", (nickname)=>{
    const element = document.getElementById("nickname");
    element.innerHTML = "Nickname: " + nickname;
});

const send_message = ()=>{
    const message_input = document.getElementById("message_input");
    socket.emit("send_message", message_input.value);
    message_input.value = "";
};

const set_nickname = ()=>{
    const nickname_input = document.getElementById("nickname_input");
    socket.emit("set_nickname", nickname_input.value);
    message_input.value = "";
};