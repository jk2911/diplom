import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import { RegionPage } from "./pages/RegionPage/RegionPage";
import { ChampionshipPage } from "./pages/ChampionshipPage/ChampionshipPage";
import { TeamPage } from "./pages/TeamPage/TeamPage";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route
          path="/admin"
          element={<Navigate to="/admin/regions" replace />}
        />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/admin/region/*" element={<RegionPage />} />

        {/* <Route path="/admin/region/*" element={<Navigate to="/admin/region/championships" replace />} /> */}
        <Route path="/admin/championship/*" element={<ChampionshipPage />} />
        <Route path="/admin/team/*" element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
