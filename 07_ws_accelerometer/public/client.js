

const sensor_gauge = document.getElementById("sensor_gauge");
const ctx = sensor_gauge.getContext("2d");

ctx.arc(150, 150, 10, 0, Math.PI * 2);
ctx.fill();