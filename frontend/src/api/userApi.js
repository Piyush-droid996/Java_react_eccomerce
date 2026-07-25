import apiClient from "./apiClient";

export const getAllUsers = () => {
  return apiClient.get("/admin/users");
};
