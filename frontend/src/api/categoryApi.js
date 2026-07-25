import apiClient from "./apiClient";

export const getAllCategories = () => {
  return apiClient.get("/categories");
};

export const getCategoryById = (id) => {
  return apiClient.get(`/categories/${id}`);
};

export const createCategory = (category) => {
  return apiClient.post("/categories", category);
};

export const updateCategory = (id, category) => {
  return apiClient.put(`/categories/${id}`, category);
};

export const deleteCategory = (id) => {
  return apiClient.delete(`/categories/${id}`);
};
