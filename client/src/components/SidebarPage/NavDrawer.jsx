import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./NavDrawer.css";

function Sidebar({ open }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("NavDrawer loaded");

    api
      .get("/categories")
      .then((response) => {
        console.log("Categories response:", response.data);

        if (response.data.success) {
          setCategories(response.data.categories);
        }
      })
      .catch((error) => {
        console.error("Failed to load categories:", error);
      });
  }, []);

  return (
    <aside
      className={`sidebar ${open ? "sidebar-expanded" : "sidebar-collapsed"}`}
    >
      <Link to="/" className="sidebar-home">
        <span className="sidebar-icon">⌂</span>
        {open && <span>Home</span>}
      </Link>

      {open && <div className="sidebar-title">CATEGORIES</div>}

      <div className="sidebar-categories">
        {categories.map((category) => (
          <Link
            to={`/category/${category.slug}`}
            className="sidebar-category"
            key={category.id}
            title={category.name}
          >
            <span className="sidebar-category-icon">
              {category.name.charAt(0)}
            </span>
            {open && <span>{category.name}</span>}
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
