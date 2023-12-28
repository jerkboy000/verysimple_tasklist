import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../../graphql/mutations";
import { setAuthCookies } from "../../js/cookie_util";

const LogInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginMutation({
        variables: { ...formData },
      });

      const loggedUser = response.data.loginUser;
      setAuthCookies(loggedUser);
      console.log("Logged in successfully:", response.data.loginUser);

      // Redirect to task list
      navigate("/tasklist");
      window.location.reload();
    } catch (loginError) {
      console.error("Error logging in:", loginError.message);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form
        onSubmit={handleLogin}
        className="p-4 rounded"
        style={{ backgroundColor: "#e0f7fa" }} // Very faint sky blue
      >
        <h2 className="mb-4">Log In</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3 d-flex justify-content-center">
          <button type="submit" disabled={loading} className="btn btn-success me-2">
            Log In
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>

        {error && <p className="text-danger">{error.message}</p>}
      </form>
    </div>
  );
};

export default LogInForm;
