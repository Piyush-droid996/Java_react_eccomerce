import { useEffect, useState } from "react";
import { createProduct } from "../../../api/productApi";
import { getAllCategories } from "../../../api/categoryApi";
function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    popularity: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      console.log("Fetching categories...");

      const response = await getAllCategories();

      console.log(response.data);

      setCategories(response.data);
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
  console.log("Categories State:", categories);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createProduct(product);

      console.log("Product Created:", response.data);

      alert("Product added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Product</h2>

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

            <button className="btn btn-primary">Save Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
