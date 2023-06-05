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
import { BukmekerPage } from "./pages/BukmekerPage/BukmekerPage";
import { BukmekerChampionshipPage } from "./pages/BukmekerPage/ChampionshipPage";
import { BukmekerMatchPage } from "./pages/BukmekerPage/MatchPage";
import { UserPage } from "./pages/UserPage/UserPage";
import { ConfirmationBetsPage } from "./pages/BukmekerPage/ConfirmationBetsPage";
import { UserBets } from "./pages/UserPage/Bets";
import jwtDecode from "jwt-decode";
import axios, { AxiosError } from "axios";
import { IToken } from "./entity/User";

function App() {
  var token = localStorage.getItem("token");
  var decoded: IToken;

  if (token != null) {
    GetToken();
  }
  async function GetToken() {
    if (token == null)
      return
    decoded = jwtDecode(token);

    try {
      const response = await axios.post(
        "https://localhost:7167/api/User/GetToken?email=" + decoded.email
      );
      localStorage.setItem("token", response.data);
    } catch (e: unknown) {
      localStorage.removeItem("token");
      window.location.assign("/");
    }

  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<Navigate to="/admin/regions" replace />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/admin/region/*" element={<RegionPage />} />
        <Route path="/admin/championship/*" element={<ChampionshipPage />} />
        <Route path="/admin/team/*" element={<TeamPage />} />
        <Route path="/admin/match/*" element={<MatchPageAdmin />} />
        <Route path="/match" element={<UserMatchPage />} />
        <Route path="/bukmeker/*" element={<BukmekerPage />} />
        <Route path="/bukmeker/championship/*" element={<BukmekerChampionshipPage />} />
        <Route path="/bukmeker/match/*" element={<BukmekerMatchPage />} />
        <Route path="/bukmeker/resultsMatch/*" element={<ConfirmationBetsPage />} />
        <Route path="/user/*" element={<UserPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
