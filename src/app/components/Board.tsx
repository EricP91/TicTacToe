"use client";
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  BoardState,
  BOARD_SIZE,
  isGameEnded,
  isBoardFull,
} from "../utils/gameLogic";

const ResetButton = styled(motion.button)`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  border-radius: 0.375rem;
  &:hover {
    background-color: #2563eb;
  }
`;

const Cell = styled(motion.button)`
  width: 6rem;
  height: 6rem;
  background-color: white;
  border: 2px solid #cbd5e0;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #edf2f7;
  }
`;

const Board: React.FC = () => {
  const [board, setBoard] = useState<BoardState[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<BoardState>(BoardState.X);
  const [winner, setWinner] = useState<BoardState>(BoardState.Empty);
  const [gameEnded, setGameEnded] = useState<Boolean>(false);
  const isDraw = isBoardFull(board) && winner === BoardState.Empty;

  useEffect(() => {
    resetBoard();
  }, []);

  const resetBoard = useCallback(() => {
    setBoard(
      Array(BOARD_SIZE)
        .fill(0)
        .map((_) => Array(BOARD_SIZE).fill(BoardState.Empty))
    );
    setCurrentPlayer(BoardState.X);
    setWinner(BoardState.Empty);
    setGameEnded(false);
  }, [setBoard, setCurrentPlayer, setWinner, setGameEnded]);

  const putStone = useCallback(
    (rowId: number, colId: number) => {
      if (board[rowId][colId] !== BoardState.Empty) {
        return;
      }
      const newBoard = [...board];
      newBoard[rowId][colId] = currentPlayer;
      setBoard(newBoard);

      const gameResult = isGameEnded(newBoard, rowId, colId);

      if (gameResult !== BoardState.Empty) {
        if (gameResult !== BoardState.Full) {
          setWinner(currentPlayer);
        }
        setGameEnded(true);
        return;
      }

      setCurrentPlayer(
        currentPlayer === BoardState.X ? BoardState.O : BoardState.X
      );
    },
    [setBoard, board, setCurrentPlayer]
  );

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">TicTacToe</h1>

      {isDraw && (
        <span className="text-lg font-medium text-red-500 mb-4">
          {`It's Draw!`}
        </span>
      )}

      <div className="flex flex-col items-center">
        <span className="text-lg font-medium text-gray-800 mb-2">
          Current Player: {currentPlayer}
        </span>

        {winner !== BoardState.Empty && (
          <span className="text-lg font-medium text-green-500 mb-2">
            Winner: {winner}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3">
        {board &&
          board.map((row, rowId) => (
            <div key={rowId} className="">
              {row.map((cell: BoardState, colId) => (
                <Cell
                  key={`${rowId}-${colId}`}
                  aria-label="cell"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={winner !== BoardState.Empty}
                  onClick={() => putStone(rowId, colId)}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {cell}
                  </motion.div>
                </Cell>
              ))}
            </div>
          ))}
        <ResetButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetBoard}
        >
          Reset
        </ResetButton>
      </div>
    </div>
  );
};

export default Board;
