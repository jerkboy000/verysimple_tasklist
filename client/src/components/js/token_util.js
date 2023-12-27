import { jwtDecode  }from "jwt-decode";


// Decodes a JWT token using the jwt-decode library. 
// If successful, it returns the decoded token; 
// otherwise, it logs an error and returns null.
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token: ", error.message);
    return null;
  }
};