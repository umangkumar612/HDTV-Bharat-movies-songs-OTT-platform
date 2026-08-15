import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminVideos from "./AdminVideos";
import "./AdminPanel.css";

function AdminPanel() {
  const [activePage, setActivePage] = useState("pending");

  return (
    <div className="admin-panel">
      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="admin-content">
        {activePage === "dashboard" && (
          <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p>Welcome to HDTV Bharat Admin Panel</p>
          </div>
        )}

        {activePage === "pending" && <AdminVideos status="pending" />}

        {activePage === "approved" && <AdminVideos status="approved" />}
      </div>
    </div>
  );
}

export default AdminPanel;