const axios = require('axios');
const express = require('express');
const PORT = process.env.PORT || 8081;
let app = express();

//muutos
app.get("/robot/joint_values/", (req, res, next) => {
  axios
    .get("https://fanuc-robot-http-server.herokuapp.com/")
    .then((robot_res) => {
      const regexp = "Joint   [1-6]: *(-?.*)";
      let joint_values = [];
      let matches = robot_res.data.matchAll(regexp);
      let count = 0;
      for (const match of matches) {
        count++;
        if (count > 6) break;
        const value = parseFloat(match[1]);
        joint_values.push(value);
      }
      console.log(joint_values);
      res.send(joint_values);
    });
});

app.listen(PORT);