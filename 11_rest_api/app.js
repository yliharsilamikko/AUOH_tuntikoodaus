const express = require("express");
const mongoose = require("mongoose");
const alarm_controller = require("./alarm_controller")
const body_parser = require("body-parser");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(body_parser.json());

// CREATE

app.post("/api/alarm", alarm_controller.api_post_alarm);



app.listen(PORT);



