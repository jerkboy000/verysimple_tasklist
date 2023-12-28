import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS_BY_USER } from "../../../graphql/queries";
import { DELETE_TASK } from "../../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { getUserIdFromCookie } from "../../js/cookie_util";
import { checkTokenAndNavigate } from "../../js/helper";
import { formatTimestampToDateTime } from "../../js/date_util";
import "../../css/TaskList.css";

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

  // Inside TaskList.jsx
  const handleEditClick = (taskId) => {
    // Find the task to edit based on taskId
    const taskToEdit = tasks.find((task) => task.id === taskId);

    // Navigate to the task form with the task details for editing
    navigate(`/task_form/${taskId}`, { state: { taskToEdit } });
 };


  const handleDeleteClick = (taskId) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this task?")) {
      // Call the deleteTask mutation
      deleteTask({ variables: { id: taskId } });
      window.location.reload();
    }
  };

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th>Description</th>
            <th>Note</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <button onClick={() => handleEditClick(task.id)}>Edit</button>
                <button
                  onClick={() => handleDeleteClick(task.id)}
                  style={{ color: "blue", backgroundColor: "red" }}
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
      <button onClick={handleClick}>Add Task</button>
    </div>
  );
};

export default TaskList;
