import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import sudoku from "sudoku-umd";

function Board() {
  const [puzzle, setPuzzle] = useState([]);
  const [solvedPuzzle, setSolvedPuzzle] = useState(null);

  useEffect(() => {
    newPuzzle();
  }, []);

  const newPuzzle = () => {
    const newPuzzle = sudoku.generate("easy");
    setPuzzle(sudoku.board_string_to_grid(newPuzzle));
    setSolvedPuzzle(sudoku.solve(newPuzzle));
  };

  const checkSolution = () => {
    const currentPuzzleString = puzzle
      .flat()
      .map((value) => (value === "" ? "." : value))
      .join("");

    if (solvedPuzzle === currentPuzzleString) {
      alert("Congratulations! You have solved the puzzle.");
    } else {
      alert("The solution is incorrect. Keep trying!");
    }
  };

  const solvePuzzle = () => {
    if (solvedPuzzle) {
      setPuzzle(sudoku.board_string_to_grid(solvedPuzzle));
    } else {
      alert("No solution available for this puzzle.");
    }
  };

  return (
    <div className="board">
      {puzzle.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((value, colIndex) => (
            <Cell
              key={colIndex}
              value={value}
              onCellValueChange={(newValue) => {
                const newPuzzle = [...puzzle];
                newPuzzle[rowIndex][colIndex] = newValue;
                setPuzzle(newPuzzle);
              }}
            />
          ))}
        </div>
      ))}
      <button onClick={newPuzzle}>New Puzzle</button>
      <button onClick={checkSolution}>Check</button>
      <button onClick={solvePuzzle}>Solve</button>
    </div>
  );
}

export default Board;
