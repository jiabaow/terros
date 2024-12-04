// src/King.js

import Piece from './Piece';

export default class King extends Piece {
    constructor(player) {
        super(player, player === 'white'
            ? 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg'
            : 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg'
        );
    }

    isMovePossible(src, dest, isDestEnemyOccupied) {
        const diff = Math.abs(src - dest);
        return (
            diff === 1 || // Move left or right
            diff === 8 || // Move up or down
            diff === 7 || // Move diagonally
            diff === 9    // Move diagonally
        );
    }

    getSrcToDestPath(src, dest) {
        return [];
    }
}
