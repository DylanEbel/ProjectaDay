import SudokuBoard from "./board.js";
import Solver from "./solver.js";

const boardEl = document.getElementById("board");

const board = new SudokuBoard(boardEl)

board.SetBoard()

const solver = new Solver(board.board)

// solver.SolveBoard()
const clearBut = document.getElementById("clear")
const randBut = document.getElementById("random")
const checkBut = document.getElementById("check")
const solveBut = document.getElementById("solve")

clearBut.addEventListener("click", () => board.ClearBoard())
checkBut.addEventListener("click", () => solver.CheckBoard())
solveBut.addEventListener("click", () => solver.SolveBoard())
randBut.addEventListener("click", () => {
    board.ClearBoard(); solver.GenRandBoard()})