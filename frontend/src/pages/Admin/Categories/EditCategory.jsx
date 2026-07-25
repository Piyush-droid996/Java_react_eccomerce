import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import categoryService from "../../../services/categoryService";

function EditCategory() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const response = await categoryService.getCategoryById(id);
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await categoryService.updateCategory(id, {
        name: category.name,
        description: category.description,
      });

      alert("Category updated successfully");

      navigate("/admin/categories");
    } catch (error) {
      console.error(error);
      alert("Unable to update category");
    }
  };

  return (
    <div className="container mt-4">
      <pre>{JSON.stringify(category, null, 2)}</pre>

      <h2 className="mb-4">Edit Category</h2>

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

        <button type="submit" className="btn btn-success">
          Update Category
        </button>
      </form>
    </div>
  );
}

export default EditCategory;
