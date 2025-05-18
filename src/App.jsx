import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import BattleArena from "./pages/BattleArena";
import GameOver from "./pages/GameOver";
import Rules from "./pages/Rules";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/battle" element={<BattleArena />} />
        <Route path="/gameover" element={<GameOver />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </Router>
  );
}

export default App;