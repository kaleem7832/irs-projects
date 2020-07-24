const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB.js");
const projectsRoutes = require("./projects.routes");
const taskRoutes = require("./taskroutes");
mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.log("Can not connect to the database" + err);
    }
  );
if (process.env.NODE_ENV === "production") {
  app.use(express.static("/build"));
}
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/projects", projectsRoutes);
app.use("/tasks", taskRoutes);
app.listen(PORT, function () {
  console.log("Server is running on Port:", PORT);
});
