import Cookies from "js-cookie";

// Retrieves the value of a cookie by its name.
export const getCookie = (cookieName) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
};

// Retrieves the user ID from the "user_id" cookie.
export const getUserIdFromCookie = () => {
  return getCookie("user_id");
};

// Retrieves the user info from the "user_info" cookie.
export const getUserInfoFromCookie = () => {
  return getCookie("user_info");
};

// Retrieves the token from the "token" cookie.
export const getTokenFromCookie = () => {
  return getCookie("token");
};

// Set the "user_id", "user_info", and "token" cookies.
export const setAuthCookies = (obj) => {
  Cookies.set("user_id", obj.user.id);
  Cookies.set("user_info", `${obj.user.name}-${obj.user.email}`);
  Cookies.set("token", obj.token);
};

// Clears the "user_id", "user_info" and "token" cookies.
export const clearCookies = () => {
  Cookies.remove("user_id");
  Cookies.remove("user_info");
  Cookies.remove("token");
  console.log("Removed cookies");
};
