import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../../api/productApi";

import ProductImages from "../../components/product/ProductImages/ProductImages";
import ProductInfo from "../../components/product/ProductInfo/ProductInfo";
import RelatedProducts from "../../components/product/RelatedProducts/RelatedProducts";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      const response = await getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!product) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <ProductImages product={product} />
        </div>

        <div className="col-md-6">
          <ProductInfo product={product} />
        </div>
      </div>

      <RelatedProducts
        categoryId={product.categoryId}
        currentProductId={product.productId}
      />
    </div>
  );
}

export default ProductDetails;
