import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/Main";
import { AboutPage } from "./pages/About";
import "bootstrap/dist/css/bootstrap.min.css";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import { RegionPage } from "./pages/RegionPage/RegionPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/region" element={<RegionPage />} />
    </Routes>
  );
}

export default App;
