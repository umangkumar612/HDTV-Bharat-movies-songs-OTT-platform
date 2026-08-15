import "./AdminSidebar.css";

function AdminSidebar({ activePage, setActivePage }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>Admin Panel</h2>
        <span>HDTV Bharat</span>
      </div>

      <nav className="admin-sidebar-menu">
        <button
          className={activePage === "dashboard" ? "admin-menu-item active" : "admin-menu-item"}
          onClick={() => setActivePage("dashboard")}
        >
          <span>⌂</span>
          Dashboard
        </button>

        <button
          className={activePage === "pending" ? "admin-menu-item active" : "admin-menu-item"}
          onClick={() => setActivePage("pending")}
        >
          <span>◷</span>
          Pending Videos
        </button>

        <button
          className={activePage === "approved" ? "admin-menu-item active" : "admin-menu-item"}
          onClick={() => setActivePage("approved")}
        >
          <span>✓</span>
          Approved Videos
        </button>
      </nav>
    </aside>
  );
}

export default AdminSidebar;