let socket = io("https://fanuc-wsserver.herokuapp.com/", {withCredentials: false});

socket.on("joint_values", (joint_values) =>{

    console.log(joint_values);
});