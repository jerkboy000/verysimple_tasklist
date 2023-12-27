import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTokenFromCookie,
  getUserIdFromCookie,
  clearCookies,
} from "./cookie_util";
import { decodeToken } from "./token_util";

// A utility function that checks for the presence and expiration of a user token.
// If the token is missing or expired, it navigates the user to the login page
// using the useNavigate hook.
export const checkTokenAndNavigate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getTokenFromCookie();
    const userId = getUserIdFromCookie();
    if (!token || !userId) {
      // No token or user ID found, navigate to login
      navigate("/");
    } else {
      // Token and user ID found, check if the token is expired
      const decodedToken = decodeToken(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        // Token is expired, clear cookies and navigate to login
        clearCookies();
        navigate("/");
      }
    }
  }, [navigate]);
};
