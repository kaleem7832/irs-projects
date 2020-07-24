import React, { useState, useEffect } from "react";
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import axios from "axios";
var columns = [
  { title: "Project Name", field: "project" },
  {
    title: "Programmer",
    field: "programmer",
    lookup: {
      Prachi: "Prachi",
      Ketan: "Ketan",
      Karishma: "Karishma",
      Kaleem: "Kaleem",
    },
  },
  { title: "Task", field: "task" },
  {
    title: "Status",
    field: "status",
    lookup: {
      "in-process": "In Process",
      "on-hold": "On Hold",
      completed: "Completed",
    },
  },
  {
    title: "Open",
    field: "action",
    render: (rowData) => (
      <Link to={{ pathname: "/details", rowData }}>
        <Button variant="contained" color="primary" className="float-right">
          Open
        </Button>
      </Link>
    ),
  },
];

export default function MaterialTableDemo() {
  const history = useHistory();
  var [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/projects")
      .then((response) => {
        setProjects(response.data.reverse());
        console.log(projects);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <Link to={"/create"}>
          <Fab color="primary" aria-label="add" size="small">
            <AddIcon />
          </Fab>
        </Link>
      </div>
      <MaterialTable
        title="Project tracker"
        columns={columns}
        data={projects}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        // editable={{
        //   onRowAdd: (newData) =>
        //     new Promise((resolve) => {
        //       resolve();

        //       var date = new Date();

        //       var today =
        //         date.getDate() +
        //         "/" +
        //         (date.getMonth() + 1) +
        //         "/" +
        //         date.getFullYear();

        //       newData = { ...newData, date: today };
        //       console.log(newData);
        //       axios
        //         .post("http://localhost:4000/projects/add", newData)
        //         .then((res) =>
        //           axios
        //             .get("http://localhost:4000/projects")
        //             .then((response) => {
        //               setProjects(response.data.reverse());
        //               console.log(projects);
        //             })
        //             .catch(function (error) {
        //               console.log(error);
        //             })
        //         );
        //     }),
        // }}
      />
    </React.Fragment>
  );
}
