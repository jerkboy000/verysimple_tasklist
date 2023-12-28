import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../../../graphql/mutations";
import { setAuthCookies } from "../../js/cookie_util";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupMutation, { loading, error }] = useMutation(SIGNUP_MUTATION);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.error("Password and confirmation do not match");
      return;
    }

    try {
      const response = await signupMutation({
        variables: { ...formData },
      });

      const signedupUser = response.data.signupUser;
      setAuthCookies(signedupUser);

      console.log("Signed up successfully:", response.data.signupUser);
      // Redirect to task list
      navigate("/tasklist");
      window.location.reload();
    } catch (signupError) {
      console.error("Error signing up:", signupError.message);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form
        onSubmit={handleSignUp}
        className="p-4 rounded"
        style={{ backgroundColor: "#e0f7fa" }} // Very faint sky blue
      >
        <h2 className="mb-4">Sign Up</h2>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>

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

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3 d-flex justify-content-center">
          <button type="submit" disabled={loading} className="btn btn-success me-2">
            Sign Up
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

export default SignUpForm;
