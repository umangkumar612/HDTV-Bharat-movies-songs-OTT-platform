import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/SidebarPage/NavDrawer";
import Home from "./pages/Home/Home";
import Videos from "./pages/Videos/Videos";
import VideoDetails from "./pages/VideoDetails/VideoDetails";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} />

      <main className={`app-main ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/video/:id" element={<VideoDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;