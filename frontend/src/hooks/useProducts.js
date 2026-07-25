import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";

export default function useProducts(
  keyword = "",
  page = 0,
  size = 5,
  sortBy = "productId",
  direction = "asc",
) {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [keyword, page, size, sortBy, direction]);

  async function fetchProducts() {
    try {
      setLoading(true);

      const response = await getAllProducts(
        keyword,
        page,
        size,
        sortBy,
        direction,
      );

      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    products,
    totalPages,
    loading,
    refresh: fetchProducts,
  };
}
