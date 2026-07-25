import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryService from "../../../services/categoryService";
function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmDelete) return;

    try {
      await categoryService.deleteCategory(categoryId);
      alert("Category deleted successfully");

      loadCategories();
    } catch (error) {
      console.error(error);

      alert("Unable to delete category");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Categories</h2>

        <Link to="/admin/categories/add" className="btn btn-primary">
          + Add Category
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th width="180">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.categoryId}>
                  <td>{category.categoryId}</td>

                  <td>{category.name}</td>

                  <td>{category.description}</td>

                  <td>
                    <Link
                      to={`/admin/categories/edit/${category.categoryId}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(category.categoryId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Categories Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
