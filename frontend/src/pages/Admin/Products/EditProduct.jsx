import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../../api/categoryApi";
import { getProductById, updateProduct } from "../../../api/productApi";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    popularity: "",
    categoryId: "",
  });

  useEffect(() => {
    fetchCategories();
    loadProduct();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProduct = async () => {
    try {
      const response = await getProductById(id);

      setProduct({
        name: response.data.name,
        description: response.data.description,
        price: response.data.price,
        imageUrl: response.data.imageUrl,
        popularity: response.data.popularity,
        categoryId: response.data.categoryId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProduct(id, product);

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Unable to update product");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Product</h2>

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={product.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>

              <textarea
                className="form-control"
                rows="4"
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Price</label>

                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Popularity</label>

                <input
                  type="number"
                  className="form-control"
                  name="popularity"
                  value={product.popularity}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Image URL</label>

              <input
                type="text"
                className="form-control"
                name="imageUrl"
                value={product.imageUrl}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Category</label>

              <select
                className="form-select"
                name="categoryId"
                value={product.categoryId}
                onChange={handleChange}
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary">Update Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
