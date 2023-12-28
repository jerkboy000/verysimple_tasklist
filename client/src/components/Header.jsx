import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfoFromCookie, clearCookies, getUserIdFromCookie } from "./js/cookie_util";

const Header = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    clearCookies();
    navigate("/");
    window.location.reload();
  }

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
    float: "right"
  };

  return (
    <header>
      <nav>
        <br />
        <br />
        <div>
            <h1>{welcome}</h1>
        </div>
        {isLoggedIn ? 
            ( <div> 
            <Link to="/">
                <button>Home</button>
            </Link>
            &nbsp;
            <Link to="/tasklist">
                <button>Tasks</button>
            </Link>
            <button style={logoutStyle}  onClick={handleLogOut}>
                Log Out
            </button>
        </div> )
        : (<></>)
        }
      </nav>
    </header>
  );
};

export default Header;