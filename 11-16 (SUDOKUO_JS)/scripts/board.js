import Tile from "./tile.js";

export default class SudokuBoard {
    board = Array.from({ length: 9 }, () => Array(9).fill(null));
    boardEl;

    constructor(board) {
        this.boardEl = board;
    }

    SetBoard() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const tile = new Tile(j, i);
                const tileEl = tile.GetElement();

                this.boardEl.appendChild(tileEl)
                this.board[j][i] = tile;
            }
        }
    }

    ClearBoard() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.board[j][i].SetValZero()
            }
        }
    }
}