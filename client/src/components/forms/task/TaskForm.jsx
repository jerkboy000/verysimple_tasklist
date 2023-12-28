import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TASK, UPDATE_TASK } from "../../../graphql/mutations"; 
import { GET_TASK_DETAILS, GET_TASKS_BY_USER } from "../../../graphql/queries";
import { useNavigate, useParams } from "react-router-dom";
import { getUserIdFromCookie } from "../../js/cookie_util";
import { checkTokenAndNavigate } from "../../js/helper";
import { formatTimestampToISOString } from "../../js/date_util";

const TaskForm = () => {
  checkTokenAndNavigate();

  const navigate = useNavigate();
  const { taskId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    note: "",
    due_date: "",
    status: "NOT STARTED",
    user_id: parseInt(getUserIdFromCookie()),
  });

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS_BY_USER }],
  });
  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_TASKS_BY_USER }],
  });
  const { loading, error, data } = useQuery(GET_TASK_DETAILS, {
    variables: { taskId },
    skip: !taskId, // Skip the query if taskId is not present
  });

  useEffect(() => {
    // Set form data if task details are available
    if (data && data.getTask) {
      const taskDetails = data.getTask;
      const formattedDueDate = formatTimestampToISOString(taskDetails.due_date);
      setFormData({
        name: taskDetails.name,
        description: taskDetails.description,
        note: taskDetails.note,
        due_date: formattedDueDate,
        status: taskDetails.status,
        user_id: taskDetails.user_id,
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskId) {
        await updateTask({
          variables: { id: taskId, ...formData },
        });
      } else {
        await createTask({
          variables: formData,
        });
      }

      await refetchTasks(); // Manually refetch tasks
      navigate("/tasklist");
    } catch (error) {
      console.error(error);
    }
  };

  const { refetch: refetchTasks } = useQuery(GET_TASKS_BY_USER, {
    variables: {
      user_id: parseInt(getUserIdFromCookie()),
    },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const cancelStyle = {
    background: "red"
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded task-form"
        style={{ backgroundColor: "#e0f7fa" }} // Very faint sky blue
      >
        <label htmlFor="name" className="form-label">Task Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="form-control mb-3"
          placeholder="Enter task name"
          required
        />

        <label htmlFor="description" className="form-label">Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="form-control mb-3"
          placeholder="Enter task description"
          required
        />

        <label htmlFor="note" className="form-label">Note:</label>
        <input
          type="text"
          name="note"
          value={formData.note}
          onChange={handleInputChange}
          className="form-control mb-3"
          placeholder="Enter additional notes"
          required
        />

        <label htmlFor="due_date" className="form-label">Due Date:</label>
        <input
          type="datetime-local"
          name="due_date"
          value={formData.due_date}
          onChange={handleInputChange}
          className="form-control mb-3"
          required
        />

        <label htmlFor="status" className="form-label">Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="form-control mb-3"
          required
        >
          <option value="NOT STARTED">NOT STARTED</option>
          <option value="IN PROGRESS">IN PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <div className="mb-3 d-flex justify-content-center">
          <button type="submit" disabled={loading} className="btn btn-success me-2">
            &nbsp;&nbsp;Save&nbsp;&nbsp;
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            style={cancelStyle}
            onClick={() => navigate("/tasklist")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;