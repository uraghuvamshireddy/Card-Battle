import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BattleArena = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const player1 = location.state?.player1 || "Player 1";
  const player2 = location.state?.player2 || "System";

  const [hp1, setHp1] = useState(100);
  const [hp2, setHp2] = useState(100);
  const [turn, setTurn] = useState("player1");
  const [damageInfo, setDamageInfo] = useState(null);
  const [cardHistory1, setCardHistory1] = useState([]);
  const [cardHistory2, setCardHistory2] = useState([]);
  const [flip1, setFlip1] = useState(false);
  const [flip2, setFlip2] = useState(false);
  const actionTimeoutRef = useRef(null);
  const resetFlipTimeoutRef = useRef(null);

  useEffect(() => {
    if (turn === "player2" && player2 === "System" && !damageInfo && !actionTimeoutRef.current && !resetFlipTimeoutRef.current) {
      const delay = Math.random() * 800 + 300;
      const aiTimer = setTimeout(() => handleAttack("player2"), delay);
      return () => clearTimeout(aiTimer);
    }
  }, [turn, player2, damageInfo]);

  const handleAttack = (playerKey) => {
    if (damageInfo || actionTimeoutRef.current || resetFlipTimeoutRef.current) {
       return;
    }

    const damage = Math.floor(Math.random() * 20) + 5;
    const from = playerKey;

    if (playerKey === "player1") {
      setFlip1(true);
      setCardHistory1(prev => [...prev, damage]);
    } else {
      setFlip2(true);
      setCardHistory2(prev => [...prev, damage]);
    }
    setDamageInfo({ damage, from });

    const fliptime = 600;
    const damagetime = 1200;
    const action = Math.max(fliptime, damagetime) + 300;

    actionTimeoutRef.current = setTimeout(() => {
      if (from === "player1") {
        setHp2(prev => {
          const newHp = Math.max(prev - damage, 0);
          if (newHp === 0) {
             navigate("/gameover", { state: { winner: player1 } });
             clearTimeout(actionTimeoutRef.current);
             clearTimeout(resetFlipTimeoutRef.current);
             actionTimeoutRef.current = null;
             resetFlipTimeoutRef.current = null;
             return newHp;
          }
          return newHp;
        });
        setTurn("player2");
      } else {
        setHp1(prev => {
          const newHp = Math.max(prev - damage, 0);
          if (newHp === 0) {
             navigate("/gameover", { state: { winner: player2 } });
             clearTimeout(actionTimeoutRef.current);
             clearTimeout(resetFlipTimeoutRef.current);
             actionTimeoutRef.current = null;
             resetFlipTimeoutRef.current = null;
             return newHp;
          }
          return newHp;
        });
        setTurn("player1");
      }

      resetFlipTimeoutRef.current = setTimeout(() => {
         setFlip1(false);
         setFlip2(false);
         setDamageInfo(null);
         resetFlipTimeoutRef.current = null;
      }, fliptime);

      actionTimeoutRef.current = null;

    }, action);
  };

  useEffect(() => {
    return () => {
      clearTimeout(actionTimeoutRef.current);
      clearTimeout(resetFlipTimeoutRef.current);
    };
  }, []);

  const isClickable = (playerKey) =>
    turn === playerKey &&
    !(playerKey === "player2" && player2 === "System") &&
    !damageInfo &&
    !actionTimeoutRef.current &&
    !resetFlipTimeoutRef.current;


  return (
    <div className="game-container">
      <div className="history-panel left">
        <h3>{player2}'s Hits</h3>
        {cardHistory2.slice().reverse().map((d, i) => (
           <div key={i} className="history-card blue">-{d}</div>
        ))}
      </div>

      <div className="player-area">
        <div className={`player-panel p1 ${turn === "player1" ? "active" : ""}`}>
          <h2>{player1}</h2>
          <div
            className={`card-slot ${isClickable("player1") ? "clickable" : ""} ${flip1 ? "flipped" : ""}`}
            onClick={() => isClickable("player1") && handleAttack("player1")}
          >
            <div className="card-inner">
                <div className="card-face front">
                   {turn === "player1" ? "✊" : "🃏"}
                </div>
                <div className="card-face back">
                  {damageInfo && damageInfo.from === "player1" ? `-${damageInfo.damage}` : null}
                </div>
            </div>
          </div>
          <div className="hp-bar-wrapper">
            <div className="hp-bar" style={{ width: `${hp1}%` }} />
            <div className="hp-text">{hp1} HP</div>
          </div>
        </div>

        <div className="arena-center">
          {damageInfo && (
            <div className={`damage-card fly-from-${damageInfo.from}`}>
                -{damageInfo.damage}
            </div>
          )}
        </div>

        <div className={`player-panel p2 ${turn === "player2" ? "active" : ""}`}>
          <h2>{player2}</h2>
          <div
            className={`card-slot ${isClickable("player2") ? "clickable" : ""} ${flip2 ? "flipped" : ""}`}
            onClick={() => isClickable("player2") && handleAttack("player2")}
          >
            <div className="card-inner">
                 <div className="card-face front">
                     {turn === "player2" ? "✊" : "🃏"}
                 </div>
                <div className="card-face back">
                   {damageInfo && damageInfo.from === "player2" ? `-${damageInfo.damage}` : null}
                </div>
            </div>
          </div>
          <div className="hp-bar-wrapper">
            <div className="hp-bar" style={{ width: `${hp2}%` }} />
            <div className="hp-text">{hp2} HP</div>
          </div>
        </div>
      </div>

      <div className="history-panel right">
         <h3>{player1}'s Hits</h3>
        {cardHistory1.slice().reverse().map((d, i) => (
           <div key={i} className="history-card red">-{d}</div>
        ))}
      </div>
    </div>
  );
};

export default BattleArena;