import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GameOver = () => {
  const location = useLocation();
  const winner = location.state?.winner || "Unknown";
  const navigate = useNavigate();

  return (
    <div className="game-over">
      <h1>🏆 Game Over 🏆</h1>
      <h2>Winner: {winner}</h2>
      <button className="restart-btn" onClick={() => navigate("/")}>Restart</button>
    </div>
  );
};

export default GameOver;