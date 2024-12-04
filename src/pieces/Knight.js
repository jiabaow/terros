// src/Knight.js
import Piece from './Piece';

export default class Knight extends Piece {
    constructor(player) {
        super(player, player === 'white'
            ? 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg'
            : 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg'
        );
    }

    isMovePossible(src, dest) {
        const possibleMoves = [
            src - 17, src - 15, src - 10, src - 6,
            src + 6, src + 10, src + 15, src + 17
        ];

        // Calculate the row and column of the source and destination
        const srcRow = Math.floor(src / 8);
        const srcCol = src % 8;
        const destRow = Math.floor(dest / 8);
        const destCol = dest % 8;

        // Check if the move is within the possible moves and does not wrap around the board
        return possibleMoves.includes(dest) &&
            Math.abs(srcRow - destRow) <= 2 &&
            Math.abs(srcCol - destCol) <= 2 &&
            Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 3;
    }

    getSrcToDestPath(src, dest) {
        return [];
    }
}
