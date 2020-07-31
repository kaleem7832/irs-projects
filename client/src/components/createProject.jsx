import React, { Component } from "react";
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.onChangeProject = this.onChangeProject.bind(this);
    this.onChangeTask = this.onChangeTask.bind(this);
    this.onChangeProgrammer = this.onChangeProgrammer.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      success: false,
      failure: false,
      exsist: false,
      date: "",
      project: "",
      task: "",
      programmer: "",
      status: "",
    };
  }

  onChangeProject(e) {
    this.setState({
      project: e.target.value,
    });
  }

  onChangeTask(e) {
    this.setState({
      task: e.target.value,
    });
  }

  onChangeProgrammer(e) {
    this.setState({
      programmer: e.target.value,
    });
  }
  onChangeStatus(e) {
    this.setState({
      status: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    var obj = {
      project: this.state.project,
      task: this.state.task,
      programmer: this.state.programmer,
      status: this.state.status,
    };

    var date = new Date();

    // var today =
    //   date.getDate() +
    //   "." +
    //   (date.getMonth() + 1) +
    //   "." +
    //   date.getFullYear() +
    //   " " +
    //   date.getHours() +
    //   ":" +
    //   date.getMinutes() +
    //   ":" +
    //   date.getSeconds();
    var today = new Date(
      new Date().toString().split("GMT")[0] + " UTC"
    ).toISOString();

    obj = { ...obj, startdate: today };

    axios
      .post("/projects/add", obj)
      .then((res) => {
        this.setState({ success: true });
        setTimeout(() => {
          this.setState({ success: false });
        }, 5000);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({ failure: true });
        setTimeout(() => {
          this.setState({ failure: false });
        }, 5000);
      });
    this.setState({
      date: "",
      project: "",
      task: "",
      programmer: "",
      status: "",
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="card p-3 col-6">
            <h4>Add Project</h4>

            <FormControl>
              <TextField
                id="project-name"
                label="Project Name"
                required="true"
                onChange={this.onChangeProject}
                value={this.state.project}
              />
            </FormControl>
            <br></br>
            <FormControl>
              <TextField
                id="project-task"
                label="Task"
                required="true"
                onChange={this.onChangeTask}
                value={this.state.task}
              />
            </FormControl>
            <br></br>
            <FormControl>
              <InputLabel id="programmer-label">Progarmmer</InputLabel>
              <Select
                labelId="programmer"
                id="programmer"
                required="true"
                onChange={this.onChangeProgrammer}
                value={this.state.programmer}
              >
                <MenuItem value={"Prachi"}>Prachi</MenuItem>
                <MenuItem value={"Ketan"}>Ketan</MenuItem>
                <MenuItem value={"Karishma"}>Karishma</MenuItem>
                <MenuItem value={"Kaleem"}>Kaleem</MenuItem>
              </Select>
            </FormControl>
            <br></br>
            <FormControl>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status"
                id="status"
                required="true"
                onChange={this.onChangeStatus}
                value={this.state.status}
              >
                <MenuItem value={"completed"}>Completed</MenuItem>
                <MenuItem value={"in-process"}>In Process</MenuItem>
                <MenuItem value={"on-hold"}>On Hold</MenuItem>
              </Select>
            </FormControl>
            <br></br>
            <FormControl>
              <Button
                variant="contained"
                color="primary"
                className="float-right"
                type="submit"
              >
                Save
              </Button>
            </FormControl>
          </div>
        </form>

        <Snackbar
          open={this.state.success}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert severity="success" className="alert alert-primary">
            Project added successfully
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.failure}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert severity="error" className="alert alert-danger">
            Unable to add project. Please try again.
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
