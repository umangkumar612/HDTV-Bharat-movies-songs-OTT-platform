import { Link } from "react-router-dom";
import "./NavDrawer.css";

function NavDrawer({ open }) {
  const categories = [
    { name: "Bhojpuri", icon: "B" },
    { name: "Bollywood", icon: "B" },
    { name: "Comedy", icon: "C" },
    { name: "Devotional", icon: "D" },
    { name: "Music", icon: "M" },
    { name: "News", icon: "N" },
    { name: "Sports", icon: "S" }
  ];

  return (
    <aside className={`nav-drawer ${open ? "nav-drawer-open" : "nav-drawer-close"}`}>
      <Link to="/" className="nav-drawer-home">
        <span className="nav-drawer-home-icon">⌂</span>
        <span>Home</span>
      </Link>

      <div className="nav-drawer-title">CATEGORIES</div>

      <div className="nav-drawer-categories">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/category/${category.name.toLowerCase()}`}
            className="nav-drawer-category"
          >
            <span className="nav-drawer-category-icon">
              {category.icon}
            </span>
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default NavDrawer;