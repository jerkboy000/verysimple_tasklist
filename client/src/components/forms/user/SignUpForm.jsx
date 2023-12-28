import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../../../graphql/mutations";
import { setAuthCookies } from "../../js/cookie_util";
import "../../css/FormStyles.css";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [signupMutation, { loading, error }] = useMutation(SIGNUP_MUTATION);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.error('Password and confirmation do not match');
      return;
    }

    try {
      const response = await signupMutation({
        variables: { ...formData },
      });

      const signedupUser = response.data.signupUser;
      setAuthCookies(signedupUser);

      console.log('Signed up successfully:', response.data.signupUser);
      // Redirect to task list
      navigate("/tasklist");
      window.location.reload();
    } catch (signupError) {
      console.error('Error signing up:', signupError.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignUp}>
        <h2>Sign Up</h2>

        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>

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
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div>
          <button type="submit" disabled={loading} className="form-button">
            Sign Up
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

export default SignUpForm;
