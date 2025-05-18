import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/battle", { state: { player1, player2 } });
  };

  const rulesPage=()=>{
    navigate("/rules")
  }

  return (
    <div className="landing-page">
      <h1 className="title">⚔️ CARD BATTLE ⚔️</h1>
      <div className="input-section">
        <input
          type="text"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          placeholder="Player 1 Name"
        />
        <input
          type="text"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          placeholder="Player 2 Name (leave empty for AI)"
        />
        <button className="start-btn" onClick={startGame}>Start Game</button>
        <button className="rules-btn" onClick={rulesPage}>Rules</button>
      </div>
    </div>
  );
};

export default LandingPage;