export const isSameDiagonal = (src, dest) => {
    const srcRow = Math.floor(src / 8);
    const srcCol = src % 8;
    const destRow = Math.floor(dest / 8);
    const destCol = dest % 8;
    return Math.abs(srcRow - destRow) === Math.abs(srcCol - destCol);
};
