import { useState } from "react";
import { useNavigate } from "react-router-dom";
import categoryService from "../../../services/categoryService";
function AddCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await categoryService.createCategory(category);

      alert("Category Added Successfully");

      navigate("/admin/categories");
    } catch (error) {
      console.error(error);

      alert("Unable to Add Category");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Category</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Category Name</label>

          <input
            type="text"
            className="form-control"
            name="name"
            value={category.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>

          <textarea
            className="form-control"
            rows="4"
            name="description"
            value={category.description}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-success">Save Category</button>
      </form>
    </div>
  );
}

export default AddCategory;
