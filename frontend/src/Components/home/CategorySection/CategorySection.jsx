import { useEffect, useState } from "react";
import { getAllCategories } from "../../../api/categoryApi";
import "./CategorySection.css";

function CategorySection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("Category useEffect");

    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="category-section">
      <h2>Shop by Category</h2>

      <div className="category-grid">
        {categories.map((category) => (
          <div className="category-card" key={category.categoryId}>
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
