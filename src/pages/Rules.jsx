import React from 'react';

const Rules = () => {
  return (
    <div className="rules-container">
      <h1 className="rules-title">Card Battle Game Rules</h1>
      <div className="rules-content">
        <section>
          <h2>🎮 Game Setup</h2>
          <ul>
            <li>Each player enters their name to begin.</li>
            <li>Both players start with a fixed HP (e.g. 100).</li>
            <li>Players take turns to select a card and attack.</li>
          </ul>
        </section>

        <section>
          <h2>🃏 Turn Mechanics</h2>
          <ul>
            <li>Only the active player can click on a card to attack.</li>
            <li>Cards flip and reveal a number that determines attack strength.</li>
            <li>Once a player attacks, the turn switches to the other player.</li>
          </ul>
        </section>

        <section>
          <h2>💥 Damage Calculation</h2>
          <ul>
            <li>The revealed number is subtracted from the opponent’s HP.</li>
            <li>Damage animations show which card was played and by whom.</li>
          </ul>
        </section>

        <section>
          <h2>📜 History</h2>
          <ul>
            <li>Each turn’s attack is logged in a side panel.</li>
            <li>Mobile view shows a history toggle or summary at the bottom.</li>
          </ul>
        </section>

        <section>
          <h2>🏆 Win Condition</h2>
          <ul>
            <li>The first player to reduce the opponent’s HP to 0 wins.</li>
            <li>Game restarts or allows rematch after a winner is declared.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Rules;
