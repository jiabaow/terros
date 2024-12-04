// src/Rook.js
import Piece from './Piece';

export default class Rook extends Piece {
    constructor(player) {
        super(player, player === 'white'
            ? 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg'
            : 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg'
        );
    }

    isMovePossible(src, dest, isDestEnemyOccupied) {
        const mod = src % 8;
        //const diff = Math.abs(src - dest);

        return (mod === dest % 8 || Math.floor(src / 8) === Math.floor(dest / 8));
    }

    getSrcToDestPath(src, dest) {
        const path = [];
        const increment = (dest > src) ? 1 : -1;

        if (Math.floor(src / 8) === Math.floor(dest / 8)) {
            for (let i = src + increment; i !== dest; i += increment) {
                path.push(i);
            }
        } else if (src % 8 === dest % 8) {
            const incrementBy = (dest > src) ? 8 : -8;
            for (let i = src + incrementBy; i !== dest; i += incrementBy) {
                path.push(i);
            }
        }
        return path;
    }
}
