import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/SidebarPage/NavDrawer";
import AdminPanel from "./components/adminModule/AdminPanel";
import Home from "./pages/Home/Home";
import Videos from "./pages/Videos/Videos";
import VideoDetails from "./pages/VideoDetails/VideoDetails";
import "./App.css";

function UserLayout(){
  const [sidebarOpen,setSidebarOpen]=useState(true);

  return(
    <>
      <Header onMenuClick={()=>setSidebarOpen(!sidebarOpen)}/>
      <Sidebar open={sidebarOpen}/>
      <main className={`app-main ${sidebarOpen?"sidebar-open":"sidebar-closed"}`}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/videos" element={<Videos/>}/>
          <Route path="/video/:id" element={<VideoDetails/>}/>
        </Routes>
      </main>
    </>
  );
}

function AdminRoute(){
  const user=JSON.parse(localStorage.getItem("user"));

  if(user?.role?.toLowerCase()!=="admin"){
    return <Navigate to="/" replace/>;
  }

  return <AdminPanel/>;
}

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminRoute/>}/>
        <Route path="*" element={<UserLayout/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;