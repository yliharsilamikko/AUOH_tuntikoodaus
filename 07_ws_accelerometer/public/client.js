let socket = io();

const sensor_gauge = document.getElementById("sensor_gauge");
const ctx = sensor_gauge.getContext("2d");

socket.on("sensor_updated", (data) => {
  const scale = 300.0 / 30.0;

  const screen_x = data.x * 10 + 150;
  const screen_y = data.y * 10 + 150;
  const screen_z = data.z * 10 + 148;

  //console.log(screen_x);

  ctx.clearRect(0, 0, sensor_gauge.width, sensor_gauge.height);

  ctx.beginPath();
  ctx.arc(screen_x, screen_y, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.rect(300, screen_z, 50, 4);
  ctx.fill();
});

const on_devicemotion = (motion) => {
  let data = {
    x: motion.accelerationIncludingGravity.x,
    y: motion.accelerationIncludingGravity.y,
    z: motion.accelerationIncludingGravity.z,
  };
  socket.emit("sensor_data", data);
};

window.addEventListener("devicemotion", on_devicemotion, true);
