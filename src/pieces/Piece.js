// src/Piece.js
export default class Piece {
    constructor(player, iconUrl) {
        this.player = player;
        this.style = { backgroundImage: `url(${iconUrl})` };
    }

    isMovePossible(src, dest) {
        return false;
    }

    getSrcToDestPath(src, dest) {
        return [];
    }
}
