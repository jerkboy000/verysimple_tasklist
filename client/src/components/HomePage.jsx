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
    navigate("/login"); // Assuming you have a route for login
  };

  return (
     <div>
      {isLoggedIn ? (
        <center>
          <h1>You are logged in!</h1>
        </center>
      ) : (
        <>
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleSignUpClick}>Sign Up</button>
        </>
      )}
    </div>
  );
};

export default HomePage;
