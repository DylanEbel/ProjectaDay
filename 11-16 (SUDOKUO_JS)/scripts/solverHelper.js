export default class SolverHelper {
    IsValidPosition(board, x, y) {
        const tile = board[x][y]
        const val = tile.val;

        for (let i = 0 ; i < 9; i++) {
            if (i == y) continue;

            const vert = board[x][i];
            if (vert.val && vert.val == val) {
                // console.log("sameVal, col")
                return false;
            }
        }
        for (let j = 0; j < 9; j++) {
            if (j == x) continue;

            const horz = board[j][y];
            if (horz.val && horz.val == val) {
                // console.log("sameVal, row")
                return false;
            }
        }

        const quadrant = [Math.floor(x / 3) , Math.floor(y / 3)];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if ((quadrant[1] * 3 + i) == y && (quadrant[0] * 3 + j) == x) continue;
                let boxedX = quadrant[0] * 3 + j;
                let boxedY = quadrant[1] * 3 + i;

                const boxed = board[boxedX][boxedY];
                if (boxed.val && boxed.val == val) {
                    // console.log("sameVal, box")
                    return false;
                }
            }
        }

        return true;
    }

    GetNextTile(board, x, y) {
        for (let i = y; i < 9; i++) {
            const jStart = (i === y) ? x : 0; 
            for (let j = jStart; j < 9; j++) {
            const tile = board[j][i];
            if (!tile.val) return tile;
            }
        }
        return null;
    }

    rand() {
        return Math.floor(9 * Math.random())
    }

    Shuffle(vals) {
        const newArray = Array.from({ length: 9}, (_, i) => i + 1)

        for (let i = 0; i < 9; i++) {
            const rand = this.rand();

            [vals[i], newArray[rand]] = [newArray[rand], vals[i]];
        }

        return vals
    }
}