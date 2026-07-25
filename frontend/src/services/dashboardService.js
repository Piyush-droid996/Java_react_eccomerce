import apiClient from "../api/apiClient";

const getDashboard = () => {
  return apiClient.get("/admin/dashboard");
};

export default {
  getDashboard,
};
