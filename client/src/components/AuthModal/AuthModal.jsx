import { useState } from "react";
import api from "../../services/api";
import "./AuthModal.css";

function AuthModal({ open, onClose, activeTab, setActiveTab }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await api.post("/login", loginData);
      console.log("LOGIN RESPONSE:", response.data);
      if (response.data.success === true) {
        const loggedInUser = response.data.user;
        console.log("USER ROLE:", loggedInUser.role);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        onClose();
        if (loggedInUser.role?.toLowerCase() === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
        return;
      }
      setMessage(response.data.message || "Login failed");
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await api.post("/register", signupData);
      if (response.data.success) {
        setMessage(response.data.message);
        setActiveTab("login");
        setLoginData({
          email: signupData.email,
          password: ""
        });
      } else {
        setMessage(response.data.message || "Sign up failed");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="auth-close" onClick={onClose}>×</button>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("login");
              setMessage("");
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={`auth-tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("signup");
              setMessage("");
            }}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-heading">
              <h2>Welcome Back</h2>
              <p>Login to your HDTV Bharat account</p>
            </div>

            <div className="auth-input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) => setLoginData({
                  ...loginData,
                  email: e.target.value
                })}
              />
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) => setLoginData({
                  ...loginData,
                  password: e.target.value
                })}
              />
            </div>

            {message && <div className="auth-message">{message}</div>}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Please wait..." : "Login"}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSignup}>
            <div className="auth-heading">
              <h2>Create Account</h2>
              <p>Join HDTV Bharat and enjoy your favorite content</p>
            </div>

            <div className="auth-input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={signupData.name}
                onChange={(e) => setSignupData({
                  ...signupData,
                  name: e.target.value
                })}
              />
            </div>

            <div className="auth-input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={signupData.email}
                onChange={(e) => setSignupData({
                  ...signupData,
                  email: e.target.value
                })}
              />
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={signupData.password}
                onChange={(e) => setSignupData({
                  ...signupData,
                  password: e.target.value
                })}
              />
            </div>

            {message && <div className="auth-message">{message}</div>}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Please wait..." : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthModal;