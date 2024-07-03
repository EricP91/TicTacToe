export enum BoardState {
	X = 'X',
	O = 'O',
	Empty = '',
	Full = 'Full',
}

export const BOARD_SIZE = 3;

export const isInBoard = (rowId: number, colId: number) => (
	rowId >= 0 && rowId < 3 && colId >= 0 && colId < 3
)

export const isBoardFull = (board: BoardState[][]) => {
	if(board.length === 0)
		return false;
	
	for(let i = 0; i < BOARD_SIZE; i++) {
		for(let j = 0; j < BOARD_SIZE; j++) {
			if(board[i][j] === BoardState.Empty) {
				return false;
			}
		}
	}
	return true;
}

export const isGameEnded = (board: BoardState[][], rowId: number, colId: number): BoardState => {
	const dx = [-1, -1, 0, 1];
	const dy = [0, -1, -1, -1];

	for(let i = 0; i < 4; i++) {
		let tx = rowId + dx[i];
		let ty = colId + dy[i];
		let count = 0;
		while(isInBoard(tx, ty) && board[tx][ty] === board[rowId][colId]) {
			count ++;
			tx += dx[i];
			ty += dy[i];
		}
		tx = rowId - dx[i];
		ty = colId - dy[i];
		while (isInBoard(tx, ty) && board[tx][ty] === board[rowId][colId]) {
			count ++;
			tx -= dx[i];
			ty -= dy[i];
		}

		if (count === BOARD_SIZE - 1) {
			return board[rowId][colId];
		}

		if(isBoardFull(board)) {
			return BoardState.Full;
		}
	}

	return BoardState.Empty;
}
