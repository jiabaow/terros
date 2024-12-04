// src/Board.js
import React, { useState } from 'react';
import './Board.css';
import Pawn from './pieces/Pawn';
import Bishop from "./pieces/Bishop";
import Rook from "./pieces/Rook";
import Knight from "./pieces/Knight";
import Queen from "./pieces/Queen";
import King from "./pieces/King";
// Import other piece classes as needed

const initialBoardSetup = [
    // Black pieces
    [new Rook('black'), new Knight('black'), new Bishop('black'), new Queen('black'), new King('black'), new Bishop('black'), new Knight('black'), new Rook('black')],
    //[null, null, null, null, null, null, null, null],
    [new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black'), new Pawn('black')],
    // Empty rows
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    // White pieces
    [new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white'), new Pawn('white')],
    //[null, null, null, null, null, null, null, null],
    [new Rook('white'), new Knight('white'), new Bishop('white'), new Queen('white'), new King('white'), new Bishop('white'), new Knight('white'), new Rook('white')],
];

const Board = () => {
    const [board, setBoard] = useState(initialBoardSetup);
    const [turn, setTurn] = useState('white');
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [error, setError] = useState('');
    const [possibleMoves, setPossibleMoves] = useState([]);

    const handleSquareClick = (row, col) => {
        console.log(`Click on [${row}, ${col}]`);
        const piece = board[row][col];
        console.log(`Is Correct turn? ${isCorrectTurn(piece)}`);

        if (selectedPiece) {
            const [selectedRow, selectedCol] = selectedPiece;
            if (isValidMove(selectedRow, selectedCol, row, col)) {
                movePiece(selectedRow, selectedCol, row, col);
                switchTurn();
                setSelectedPiece(null);
                setPossibleMoves([]);
                setError('');
            } else {
                // Reset selection if the move is invalid
                setSelectedPiece(null);
                setPossibleMoves([]);
                setError('Invalid move! Please try again.');
            }
        } else if (piece && isCorrectTurn(piece)) {
            setSelectedPiece([row, col]);
            const moves = getPossibleMoves(row, col);
            setPossibleMoves(moves);
            console.log(`Possible moves: ${JSON.stringify(moves)}`);
            setError('');
        } else {
            // Clear possible moves and selection if clicking on an empty square or wrong piece
            setSelectedPiece(null);
            setPossibleMoves([]);
        }
    };

    const isValidMove = (startRow, startCol, endRow, endCol) => {
        return possibleMoves.some(([r, c]) => r === endRow && c === endCol);
    };

    const getPossibleMoves = (startRow, startCol) => {
        const piece = board[startRow][startCol];
        if (!piece) return [];

        const moves = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const dest = row * 8 + col;
                const src = startRow * 8 + startCol;
                const isDestEnemyOccupied = board[row][col] && board[row][col].player !== piece.player;
                if (piece.isMovePossible(src, dest, isDestEnemyOccupied)) {
                    moves.push([row, col]);
                }
            }
        }
        return moves;
    };

    const isCorrectTurn = (piece) => {
        return piece && piece.player === turn;
    };

    const movePiece = (startRow, startCol, endRow, endCol) => {
        const newBoard = board.map((row) => row.slice());
        newBoard[endRow][endCol] = newBoard[startRow][startCol];
        newBoard[startRow][startCol] = null;
        setBoard(newBoard);
    };

    const switchTurn = () => {
        setTurn(turn === 'white' ? 'black' : 'white');
    };

    return (
        <div>
            <h2>{turn.charAt(0).toUpperCase() + turn.slice(1)}'s Turn</h2>
            {error && <div className="error">{error}</div>}
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="board-row">
                        {row.map((piece, colIndex) => (
                            <div
                                key={colIndex}
                                className={`board-square ${
                                    possibleMoves.some(([r, c]) => r === rowIndex && c === colIndex)
                                        ? 'highlight'
                                        : ''
                                }`}
                                onClick={() => handleSquareClick(rowIndex, colIndex)}
                                style={piece ? piece.style : {}}
                            >
                                {piece ? <img src={piece.style.backgroundImage.slice(5, -2)} alt="" /> : null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Board;
