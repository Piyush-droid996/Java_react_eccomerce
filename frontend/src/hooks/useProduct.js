import { useEffect, useState } from "react";
import { getProductById } from "../api/productApi";

function useProduct(id) {
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      setLoading(true);

      const response = await getProductById(id);

      setProduct(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    product,
    loading,
    error,
  };
}

export default useProduct;
