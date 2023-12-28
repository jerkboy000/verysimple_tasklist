import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TASK, UPDATE_TASK } from "../../../graphql/mutations"; 
import { GET_TASK_DETAILS } from "../../../graphql/queries";
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

  const [createTask] = useMutation(CREATE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
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
        // If taskId is present, it's an edit operation
        await updateTask({
          variables: { id: taskId, ...formData },
        });
      } else {
        // If taskId is not present, it's a create operation
        await createTask({
          variables: formData,
        });
      }

      navigate("/tasklist");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const cancelStyle = {
    background: "red"
  }

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />

        <label>Note:</label>
        <input type="text" name="note" value={formData.note} onChange={handleInputChange} required />

        <label>Due Date:</label>
        <input type="datetime-local" name="due_date" value={formData.due_date} onChange={handleInputChange} required />

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleInputChange} required>
          <option value="NOT STARTED">NOT STARTED</option>
          <option value="IN PROGRESS">IN PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <br />
        <br />
        <div>
          <button type="submit" disabled={loading} className="form-button">
            Save
          </button>
          <button type="button" className="form-button" 
            style={cancelStyle} onClick={() => navigate("/tasklist")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
