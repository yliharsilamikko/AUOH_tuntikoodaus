const alarm_model = require("./alarm_model");

const api_post_alarm = (req, res) => {
  let model = alarm_model(req.body);
  model
    .save()
    .then((model) => {
      res.send(model);
    })
    .catch((err) => {
        res.status(500);
        res.send(err.message);
    });
};

module.exports.api_post_alarm = api_post_alarm;