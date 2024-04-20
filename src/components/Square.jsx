import React from "react";
import "./board.css";

const Square = ({ value, onSquareClick }) => {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
};

export default Square;
