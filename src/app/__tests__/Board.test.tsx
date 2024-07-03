import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Board from "../components/Board";

test("renders the Tic Tac Toe grid", () => {
  render(<Board />);
  const cells = screen.getAllByLabelText("cell");
  expect(cells).toHaveLength(9);
});

test('marks cells with "X" and "O"', () => {
  render(<Board />);
  const cells = screen.getAllByLabelText("cell");
  fireEvent.click(cells[0]);
  expect(cells[0]).toHaveTextContent("X");
  fireEvent.click(cells[1]);
  expect(cells[0]).toHaveTextContent("X");
});

describe("test win cases", () => {
  test("detects a win condition in a row", () => {
    render(<Board />);
    const cells = screen.getAllByLabelText("cell");
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X
    expect(screen.getByText("Winner: X")).toBeInTheDocument();
  });

  test("detects a win condition in a column", () => {
    render(<Board />);
    const cells = screen.getAllByLabelText("cell");
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[1]); // O
    fireEvent.click(cells[3]); // X
    fireEvent.click(cells[2]); // O
    fireEvent.click(cells[6]); // X
    expect(screen.getByText("Winner: X")).toBeInTheDocument();
  });

  test("detects a win condition in a diagonal", () => {
    render(<Board />);
    const cells = screen.getAllByLabelText("cell");
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[1]); // O
    fireEvent.click(cells[4]); // X
    fireEvent.click(cells[2]); // O
    fireEvent.click(cells[8]); // X
    expect(screen.getByText("Winner: X")).toBeInTheDocument();
  });
});

test('detects a draw condition', () => {
  render(<Board />);
  const cells = screen.getAllByLabelText("cell");
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[1]); // O
  fireEvent.click(cells[2]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[3]); // X
  fireEvent.click(cells[5]); // O
  fireEvent.click(cells[7]); // X
  fireEvent.click(cells[6]); // O
  fireEvent.click(cells[8]); // X
  expect(screen.getByText(/It's Draw!/i)).toBeInTheDocument();
});

test('resets the game when the reset button is clicked', () => {
  render(<Board />);
  const cells = screen.getAllByLabelText("cell");
  fireEvent.click(cells[0]); // X
  fireEvent.click(screen.getByText('Reset'));
  cells.forEach(cell => {
    expect(cell).toHaveTextContent('');
  });
});