import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";
import "./Header.css";

function Header({ onMenuClick }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const user = JSON.parse(localStorage.getItem("user"));

  const openAuth = (tab) => {
    setActiveTab(tab);
    setAuthOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleUpload = () => {
    window.location.href = "/upload";
  };

  return (
    <>
      <header className="header">
        <button className="menu-button" onClick={onMenuClick}>
          ☰
        </button>

        <div className="header-logo">
          <span>HdtvBharat</span>
        </div>

        <div className="header-search">
          <input placeholder="Search videos, bhajans, movies..." />
          <button className="search-button">⌕</button>
        </div>

        <div className="header-actions">
          {user ? (
            <div className="header-user-section">
              <button
                className="upload-header-btn"
                onClick={handleUpload}
                title="Upload Video"
              >
                ⬆<span>Upload</span>
              </button>

              <div className="header-user-info">
                <div className="header-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="header-user-name">{user.name}</span>
              </div>

              <button className="logout-header-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                className="login-header-btn"
                onClick={() => openAuth("login")}
              >
                Login
              </button>

              <button
                className="signup-header-btn"
                onClick={() => openAuth("signup")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
}

export default Header;
