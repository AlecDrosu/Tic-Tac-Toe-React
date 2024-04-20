import React, { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [toggle, setToggle] = useState(true)

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    const isCurrentMove = move === currentMove;

    if (isCurrentMove) {
      description = "You are at move #: " + move;
    } else if (move > 0) {
      description = "Go to move #: " + move;
    } else {
      description = "Go to game start";
    }

    return (
      <>
        {isCurrentMove ? (
          <span>{description}</span>
        ) : (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
          </li>
        )}
      </>
    );
  });

  function handleToggle() {
    setToggle(!toggle)
  }
  const orderedMoves = toggle ? moves : [...moves].reverse()

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div className="toggle-group">
            <button className="toggle-on" onClick={handleToggle}>Ascending</button>
            <button className="toggle-off" onClick={handleToggle}>Descending</button>
        </div>
        <ol>{orderedMoves}</ol>
      </div>
    </div>
  );
};

export default Game;
