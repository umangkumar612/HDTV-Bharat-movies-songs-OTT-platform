import "./Header.css";

function Header({ onMenuClick }) {
  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-button"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <img
          src="/hdtv-bharat-logo.png"
          alt="HdtvBharat"
          className="header-logo"
        />
      </div>

      <div className="header-search">
        <input type="text" placeholder="Search videos, bhajans, movies..." />
        <button className="search-button">⌕</button>
      </div>

      <div className="header-actions">
        <button
          className="header-action video-action"
          aria-label="Upload video"
        >
          📹
        </button>

        <button
          className="header-action bell-action"
          aria-label="Notifications"
        >
          🔔
        </button>

        <button className="header-action profile-action" aria-label="Profile">
          👤
        </button>
      </div>
    </header>
  );
}

export default Header;
