const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Task = new Schema(
  {
    project: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    programmer: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    startdate: {
      type: String,
      required: true,
    },
    enddate: {
      type: String,
      //required: true,
    },
  },
  {
    collection: "taskhistory",
  }
);

module.exports = mongoose.model("Task", Task);
