import SolverHelper from "./solverHelper.js"

export default class Solver {
    board
    Helper = new SolverHelper()
    num = Math.random()
    vals = Array.from({ length: 9}, (_, i) => i + 1)

    constructor(inputBoard) {
        this.board = inputBoard
        // this.solvedBoard = this.Helper.GenerateDeepCopy(inputBoard)
    }

    CheckBoard(isFromFunc = false) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const tile = this.board[j][i]

                if (tile.val) {
                    const isValid = this.Helper.IsValidPosition(this.board, j, i);
                    if (!isValid) {
                        alert("This board is not valid")
                        return false
                    }
                }
            }
        }

        if (!isFromFunc) {
            alert("this board is valid")
        }
        return true;
    }

    SolveBoard() {
        let output
        if (this.CheckBoard(true)) {
            output = this.Solve()
        }
    }

    GenRandBoard() {
        this.Solve(null, null, null, true)
    }

    Solve(x = null, y = null, tile = null, isRand = false) {
        if (!tile) {
            const t = this.Helper.GetNextTile(this.board, 0, 0)
            if (!t) return true;
            ({x, y} = t);
            tile = t;
        }

        if (tile.val) {
            const next = this.Helper.GetNextTile(this.board, x, y);
            if (!next) return true;
            return this.Solve(next.x, next.y, next, isRand)
        }

        let setVals = isRand ? this.Helper.Shuffle(this.vals) : this.vals
        for (let i of setVals) {
            tile.SetVal(i);
            if (this.Helper.IsValidPosition(this.board, x, y)) {
                const next = this.Helper.GetNextTile(this.board, x, y)
                if (!next) return true;
                if (this.Solve(next.x, next.y, next, isRand)) return true;
            }
        }
        
        tile.SetValZero();
        return false
    }
}