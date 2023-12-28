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
      setWelcome("Discover the Power of Task Organization For the SIMPLETONS!");
    }
  }, []);

  const logoutStyle = {
    background: "red",
  };

  return (
    <header className="bg-primary text-white">
      <nav className="container">
        <div className="py-1 d-flex justify-content-between align-items-center">
          <h4>{welcome}</h4>
          {isLoggedIn ? (
            <div className="d-flex">
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
