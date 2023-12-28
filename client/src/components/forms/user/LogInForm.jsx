import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../../graphql/mutations";
import { setAuthCookies } from "../../js/cookie_util";
import "../../css/FormStyles.css";

const LogInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      console.log('Logged in successfully:', response.data.loginUser);

      // Redirect to task list
      navigate("/tasklist");
      window.location.reload();
    } catch (loginError) {
      console.error('Error logging in:', loginError.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <h2>Log In</h2>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div>
          <button type="submit" disabled={loading} className="form-button">
            Log In
          </button>
          <button type="button" className="form-button cancel-button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>

        {error && <p className="form-error">{error.message}</p>}
      </form>
    </div>
  );
};

export default LogInForm;
