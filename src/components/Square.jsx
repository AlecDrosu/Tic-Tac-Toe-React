import React from "react";
import "./board.css";

const Square = ({ value, onSquareClick, style }) => {
  return (
    <button className="square" onClick={onSquareClick} style={style}>
      {value}
    </button>
  );
};

export default Square;
