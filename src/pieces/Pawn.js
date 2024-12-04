// src/Pawn.js
import Piece from './Piece';
import { isSameDiagonal } from '../Helpers';

export default class Pawn extends Piece {
    constructor(player) {
        super(player, player === 'white'
            ? 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg'
            : 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg'
        );
        this.initialPositions = {
            white: [48, 49, 50, 51, 52, 53, 54, 55],
            black: [8, 9, 10, 11, 12, 13, 14, 15],
        };
    }

    isMovePossible(src, dest, isDestEnemyOccupied) {
        const direction = this.player === 'white' ? -8 : 8;
        const doubleDirection = this.player === 'white' ? -16 : 16;
        const diagonalLeft = this.player === 'white' ? -9 : 7;
        const diagonalRight = this.player === 'white' ? -7 : 9;

        if (dest === src + direction && !isDestEnemyOccupied) {
            return true;
        }
        if (dest === src + doubleDirection && !isDestEnemyOccupied && this.initialPositions[this.player].includes(src)) {
            return true;
        }
        if (isDestEnemyOccupied && (dest === src + diagonalLeft || dest === src + diagonalRight) && isSameDiagonal(src, dest)) {
            return true;
        }
        return false;
    }

    getSrcToDestPath(src, dest) {
        if (Math.abs(dest - src) === 16) {
            return [src + (this.player === 'white' ? -8 : 8)];
        }
        return [];
    }
}
