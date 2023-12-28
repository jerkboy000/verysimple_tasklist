import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS_BY_USER } from "../../../graphql/queries";
import { DELETE_TASK } from "../../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { getUserIdFromCookie } from "../../js/cookie_util";
import { checkTokenAndNavigate } from "../../js/helper";
import { formatTimestampToDateTime } from "../../js/date_util";

const TaskList = () => {
  checkTokenAndNavigate();

  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_TASKS_BY_USER, {
    variables: {
      user_id: parseInt(getUserIdFromCookie()),
    },
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS_BY_USER }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const tasks = data.getTasksByUser;

  const handleClick = () => {
    navigate("/task_form");
  };

  const handleEditClick = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    navigate(`/task_form/${taskId}`, { state: { taskToEdit } });
  };

  const handleDeleteClick = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask({ variables: { id: taskId } });
    }
  };

  const thStyle = {
    background: "#343a40", 
    color: "#fff"
  }

  return (
    <div className="container mt-5">
      <h2>Your Tasks</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th style={thStyle}>Action</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Note</th>
            <th style={thStyle}>Due Date</th>
            <th style={thStyle}> Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <button
                  onClick={() => handleEditClick(task.id)}
                  className="btn btn-primary me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(task.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.note}</td>
              <td>{formatTimestampToDateTime(task.due_date)}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <button
        onClick={handleClick}
        className="btn btn-success"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskList;
