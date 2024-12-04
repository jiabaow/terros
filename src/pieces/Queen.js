// src/Queen.js
import Piece from './Piece';
import { isSameDiagonal } from '../Helpers';

export default class Queen extends Piece {
    constructor(player) {
        super(player, player === 'white'
            ? 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg'
            : 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg'
        );
    }

    isMovePossible(src, dest, isDestEnemyOccupied) {
        const mod = src % 8;
        //const diff = Math.abs(src - dest);

        return (mod === dest % 8 || Math.floor(src / 8) === Math.floor(dest / 8) || isSameDiagonal(src, dest));
    }

    getSrcToDestPath(src, dest) {
        const path = [];
        const srcRow = Math.floor(src / 8);
        const srcCol = src % 8;
        const destRow = Math.floor(dest / 8);
        const destCol = dest % 8;

        if (srcRow === destRow) {
            // Same row
            const increment = (dest > src) ? 1 : -1;
            for (let i = src + increment; i !== dest; i += increment) {
                path.push(i);
            }
        } else if (srcCol === destCol) {
            // Same column
            const incrementBy = (dest > src) ? 8 : -8;
            for (let i = src + incrementBy; i !== dest; i += incrementBy) {
                path.push(i);
            }
        } else if (isSameDiagonal(src, dest)) {
            // Same diagonal
            const rowIncrement = (destRow > srcRow) ? 1 : -1;
            const colIncrement = (destCol > srcCol) ? 1 : -1;
            let currentRow = srcRow + rowIncrement;
            let currentCol = srcCol + colIncrement;
            while (currentRow !== destRow && currentCol !== destCol) {
                path.push(currentRow * 8 + currentCol);
                currentRow += rowIncrement;
                currentCol += colIncrement;
            }
        }
        return path;
    }
}
