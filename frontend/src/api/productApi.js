import apiClient from "./apiClient";

export const getAllProducts = (
  keyword = "",
  page = 0,
  size = 5,
  sortBy = "productId",
  direction = "asc",
) => {
  return apiClient.get("/products", {
    params: {
      keyword,
      page,
      size,
      sortBy,
      direction,
    },
  });
};
export const getProductById = (id) => {
  return apiClient.get(`/products/${id}`);
};

export const createProduct = (product) => {
  return apiClient.post("/products", product);
};

export const updateProduct = (id, product) => {
  return apiClient.put(`/products/${id}`, product);
};

export const deleteProduct = (id) => {
  return apiClient.delete(`/products/${id}`);
};
