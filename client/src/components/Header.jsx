import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfoFromCookie, clearCookies, getUserIdFromCookie } from "./js/cookie_util";

const Header = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    clearCookies();
    navigate("/");
    window.location.reload();
  };

  const [welcome, setWelcome] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = getUserIdFromCookie();
    if (userId) {
      setIsLoggedIn(true);
      setWelcome("Welcome, " + getUserInfoFromCookie() + "!");
    } else {
      setWelcome("Not signed up or logged in!");
    }
  }, []);

  const logoutStyle = {
    background: "red",
  };

  return (
    <header className="bg-primary text-white">
      <nav className="container">
        <div className="py-1">
          <h3>{welcome}</h3>
        </div>
        {isLoggedIn ? (
          <div className="d-flex justify-content-end">
            <Link to="/" className="btn btn-light me-2">
              Home
            </Link>
            <Link to="/tasklist" className="btn btn-light me-2">
              Tasks
            </Link>
            <button
              style={logoutStyle}
              className="btn btn-danger"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </div>
        ) : (
          <></>
        )}
      </nav>
    </header>
  );
};

export default Header;
