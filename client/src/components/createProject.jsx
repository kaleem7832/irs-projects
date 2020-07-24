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
      open: false,
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

    var today =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    obj = { ...obj, date: today };

    axios.post("http://localhost:4000/projects/add", obj).then((res) => {
      this.setState({ open: true });
      setTimeout(() => {
        this.setState({ open: false });
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
                onChange={this.onChangeProject}
                value={this.state.project}
              />
            </FormControl>
            <br></br>
            <FormControl>
              <TextField
                id="project-task"
                label="Task"
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
          open={this.state.open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert severity="success" className="alert alert-primary">
            Project added successfully
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
