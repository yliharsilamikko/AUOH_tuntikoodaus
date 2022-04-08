const alarm_model = require("./alarm_model");


// CRUD

//CREATE

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

// READ

const api_get_alarms = (req, res) => {
    alarm_model.find({}).then((alarms)=>{
        res.send(alarms);
    });
};

const api_get_alarm = (req, res) => {
    const id = req.params.id;
    alarm_model.findById(id).then((alarm)=>{
        res.send(alarm);
    }).catch(()=>{
        res.status(404);
        res.send("not found");
    });
};


const api_put_alarm = (req, res) => {
    const id = req.params.id;
    alarm_model.findByIdAndUpdate(id, req.body).then((alarm)=>{
        res.send(alarm);
    });
};


module.exports.api_post_alarm = api_post_alarm;
module.exports.api_get_alarms = api_get_alarms;
module.exports.api_get_alarm = api_get_alarm;
module.exports.api_put_alarm = api_put_alarm;


