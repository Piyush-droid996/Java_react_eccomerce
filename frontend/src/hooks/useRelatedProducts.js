import { useEffect, useState } from "react";
import { getProductsByCategory } from "../api/productApi";

function useRelatedProducts(categoryId, currentProductId) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    fetchRelatedProducts();
  }, [categoryId]);

  async function fetchRelatedProducts() {
    try {
      setLoading(true);

      const response = await getProductsByCategory(categoryId);

      const filteredProducts = response.data.filter(
        (product) => product.productId !== currentProductId,
      );

      setProducts(filteredProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    products,
    loading,
  };
}

export default useRelatedProducts;
