import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateProject from "./components/createProject";
import DataTable from "./components/material";
import ProjectDetails from "./components/ProjectDetails";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import "./App.css";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className="header row bg-primary p-2">
            <div className="container">
              <div className="row">
                <div className="col">
                  <img
                    src="https://www.iresearchservices.com/public/frontend/assets/images/logo.png"
                    alt="irs logo"
                  ></img>
                </div>
                <div className="col">
                  <div className="float-right ">
                    <Link className="btn text-white m-2" to={"/"}>
                      Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="container">
          <Switch>
            <Route exact path="/" component={DataTable} />
            <Route exact path="/details" component={ProjectDetails} />
            <Route exact path="/create" component={CreateProject} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
