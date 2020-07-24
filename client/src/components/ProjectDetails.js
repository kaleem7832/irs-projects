import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

var columns = [
  { title: "Date", field: "date", editable: "never" },
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
];
export default function MaterialTableDemo(props) {
  const history = useHistory();
  var [tasks, setTasks] = useState([]);
  if (props.location.rowData == undefined) {
    history.push("/");
  }

  useEffect(() => {
    axios
      .get("/tasks/history/" + props.location.rowData.project)
      .then((response) => {
        setTasks(response.data.reverse());
        console.log(tasks);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <h4>
        <span className="small-font">Project:</span>{" "}
        <span className="text-primary">{props.location.rowData.project}</span>
      </h4>
      <hr className="hr"></hr>
      <p>
        Last task <b>{props.location.rowData.task}</b> done by{" "}
        <b>{props.location.rowData.programmer}</b> and status :{" "}
        <b>{props.location.rowData.status}</b>
      </p>

      <MaterialTable
        title="Task History"
        columns={columns}
        data={tasks}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              resolve();

              var date = new Date();

              var today =
                date.getDate() +
                "/" +
                (date.getMonth() + 1) +
                "/" +
                date.getFullYear();

              newData = { ...newData, date: today };
              newData = { ...newData, project: props.location.rowData.project };

              axios.post("/tasks/add", newData).then((res) =>
                axios
                  .get("/tasks/history/" + props.location.rowData.project)
                  .then((response) => {
                    setTasks(response.data.reverse());
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
              );
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              resolve();
              if (oldData) {
                axios
                  .post("/tasks/update/" + oldData._id, newData)
                  .then((res) =>
                    axios
                      .get("/tasks/history/" + props.location.rowData.project)
                      .then((response) => {
                        setTasks(response.data.reverse());
                      })
                      .catch(function (error) {
                        console.log(error);
                      })
                  );
              }
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              resolve();
              //handle here
              if (tasks.length == 1) {
                console.log(
                  "Cant delete the last task consider deleting the project"
                );
                //return false;
              }
              axios
                .get("/tasks/delete/" + oldData._id)
                .then((res) =>
                  axios
                    .get("/tasks/history/" + props.location.rowData.project)
                    .then((response) => {
                      setTasks(response.data.reverse());
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                )
                .catch((err) => console.log(err));
            }),
        }}
      />
    </React.Fragment>
  );
}
