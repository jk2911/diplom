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
import { MatchPageAdmin } from "./pages/AdminPage/MatchPage/MatchPageAdmin";
import { UserMatchPage } from "./pages/UserMatchPage/UserMatchPage";
import { BukmekerPage } from "./pages/Bukmeker/BukmekerPage";
import { BukmekerChampionshipPage } from "./pages/Bukmeker/ChampionshipPage";

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

        <Route path="/admin/match/*" element={<MatchPageAdmin />} />

        <Route path="/match" element={<UserMatchPage />} />

        <Route path="/bukmeker" element={<BukmekerPage />} />

        <Route path="/bukmeker/championship" element={<BukmekerChampionshipPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
