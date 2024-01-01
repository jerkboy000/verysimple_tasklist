import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "./js/cookie_util";
import { decodeToken } from "./js/token_util";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) {
      setIsLoggedIn(false);
    } else {
      const decodedToken = decodeToken(token);
      setIsLoggedIn(decodedToken.exp * 1000 >= Date.now());
    }
  }, []);

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6">
          <h1>Welcome to Very Simple Task List App</h1>
          <p className="lead">
            Organize your tasks effortlessly with our user-friendly task
            management application. Sign up or log in to get started!
          </p>
          {!isLoggedIn && (
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
              <button
                className="btn btn-outline-primary btn-lg"
                onClick={handleLoginClick}
              >
                Log In
              </button>
            </div>
          )}
        </div>
        {isLoggedIn && (
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">You are logged in!</h2>
                <p className="card-text">
                  Explore your tasks and start managing them efficiently.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/tasklist")}
                >
                  View Tasks
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
