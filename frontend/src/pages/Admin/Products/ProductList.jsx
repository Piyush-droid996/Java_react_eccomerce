import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../../api/productApi";
import useProducts from "../../../hooks/useProducts";

function ProductList() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [sortBy] = useState("productId");
  const [direction] = useState("asc");

  const { products, totalPages, loading, refresh } = useProducts(
    keyword,
    page,
    size,
    sortBy,
    direction,
  );

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);

      alert("Product deleted successfully");

      refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  }

  if (loading) {
    return <h3 className="text-center mt-5">Loading Products...</h3>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>

        <Link to="/admin/products/add" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          {/* Search */}
          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search product..."
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setPage(0);
                }}
              />
            </div>
          </div>

          {/* Table */}
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Popularity</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.productId}>
                    <td>{product.productId}</td>

                    <td>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        width="60"
                        height="60"
                        style={{ objectFit: "cover" }}
                      />
                    </td>

                    <td>{product.name}</td>

                    <td>₹ {product.price}</td>

                    <td>{product.popularity}</td>

                    <td>
                      <Link
                        to={`/admin/products/edit/${product.productId}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product.productId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-center align-items-center mt-3">
            <button
              className="btn btn-outline-primary me-3"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span>
              Page {page + 1} of {totalPages}
            </span>

            <button
              className="btn btn-outline-primary ms-3"
              disabled={page + 1 >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
