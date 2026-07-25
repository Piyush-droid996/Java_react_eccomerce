// import apiClient from "./apiClient";

// export const login = (loginRequest) => {
//   return apiClient.post("/auth/login", loginRequest);
// };

// export const register = (registerRequest) => {
//   return apiClient.post("/auth/register", registerRequest);
// };

// export const login = () => {
//   console.log("login export works");
// };

// export const register = () => {
//   console.log("register export works");
// };
import apiClient from "./apiClient";

export const login = (loginRequest) => {
  return apiClient.post("/auth/login", loginRequest);
};

export const register = (registerRequest) => {
  return apiClient.post("/auth/register", registerRequest);
};
