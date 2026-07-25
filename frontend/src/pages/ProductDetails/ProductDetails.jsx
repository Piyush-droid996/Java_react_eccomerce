import { useParams } from "react-router-dom";

import useProduct from "../../hooks/useProduct";

import ProductImages from "../../components/product/ProductImages/ProductImages";
import ProductInfo from "../../components/product/ProductInfo/ProductInfo";
import RelatedProducts from "../../components/product/RelatedProducts/RelatedProducts";
import ProductReviews from "../../components/product/ProductReviews/ProductReviews";

function ProductDetails() {
  const { id } = useParams();

  const { product, loading, error } = useProduct(id);

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  if (error) {
    return <h3 className="text-center mt-5">Product not found</h3>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-5">
          <ProductImages product={product} />
        </div>

        <div className="col-md-7">
          <ProductInfo product={product} />
        </div>
      </div>

      <hr />

      <RelatedProducts
        categoryId={product.categoryId}
        productId={product.productId}
      />

      <hr />

      <ProductReviews productId={product.productId} />
    </div>
  );
}

export default ProductDetails;
