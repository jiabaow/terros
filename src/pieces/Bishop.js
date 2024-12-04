// src/Bishop.js
import Piece from './Piece';
import { isSameDiagonal } from '../Helpers';

export default class Bishop extends Piece {
    constructor(player) {
        super(player, player === 'white'
            ? 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg'
            : 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg'
        );
    }

    isMovePossible(src, dest, isDestEnemyOccupied) {
        return isSameDiagonal(src, dest);
    }

    getSrcToDestPath(src, dest) {
        const path = [];
        const srcRow = Math.floor(src / 8);
        const srcCol = src % 8;
        const destRow = Math.floor(dest / 8);
        const destCol = dest % 8;

        const rowIncrement = (destRow > srcRow) ? 1 : -1;
        const colIncrement = (destCol > srcCol) ? 1 : -1;

        let currentRow = srcRow + rowIncrement;
        let currentCol = srcCol + colIncrement;

        while (currentRow !== destRow && currentCol !== destCol) {
            path.push(currentRow * 8 + currentCol);
            currentRow += rowIncrement;
            currentCol += colIncrement;
        }

        return path;
    }
}
