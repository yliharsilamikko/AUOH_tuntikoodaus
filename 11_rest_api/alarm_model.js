const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        reason:{
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("alarm", schema);