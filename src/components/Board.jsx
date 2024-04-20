import React from "react";
import Square from "./Square";
import "./board.css";

const Board = ({ xIsNext, squares, onPlay }) => {

  const winner = calculateWinner(squares);
  let status;

  const isDraw = squares.every((square) => square !== null) && winner === null;

  if (winner) {
    status = "The winner is: " + winner;
  } else if (isDraw) {
    status = "The game is a tie.";
  } else {
    status = "Next player is: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] !== null || winner !== null) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[i] = xIsNext ? "X" : "O";

    onPlay(squaresCopy)
  }

  function renderSquare(i) {
    return <Square value={squares[i]} onSquareClick={() => handleClick(i)} />;
  }
  function renderRow(start) {
    return (
      <div className="board-row">
        {renderSquare(start)}
        {renderSquare(start + 1)}
        {renderSquare(start + 2)}
      </div>
    );
  }

  return (
    <div className="board">
      {renderRow(0)}
      {renderRow(3)}
      {renderRow(6)}
      <div className="status">{status}</div>
    </div>
  );
};

export default Board;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] !== null &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}
