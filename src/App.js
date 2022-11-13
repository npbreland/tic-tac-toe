import './App.css';

import { Board } from './Board/Board';
import { MessageBox } from './MessageBox/MessageBox';

import { useState } from 'react';
import io from "socket.io-client";

const socket = io.connect('http://localhost:3001');
const params = new URLSearchParams(window.location.search);
const myPlayer = params.get('player');

const App = () => {

  // Player 'X' goes first
  const [ activePlayer, setActivePlayer ] = useState('X');

  const [ winner, setWinner ] = useState('');
  const [ draw, setDraw ] = useState(false);

  const cellsAllEmpty = ['', '', '', '', '', '', '', '', ''];
  const [ cellContents, setCellContents ] = useState(cellsAllEmpty);

  /**
   * Fills cell with current player's token and emits a state change event with
   * the next game state
   *
   * @param {Number} index of cell to fill
   * @emits "state change"
   */
  const fillCell = (cellIndex) => {
    const newCellContents = [...cellContents];
    newCellContents[cellIndex] = activePlayer;
    socket.emit('state change', getNextGameState(newCellContents));
  }

  /**
   * Emits a stage change event with newGameState, which will restart the game
   *
   * @emits "state change"
  */
  const restart = () => {
    const newGameState = {
      activePlayer: 'X',
      cellContents: cellsAllEmpty,
      winner: '',
      draw: false
    };
    socket.emit('state change', newGameState);
  };

  /**
   * Sets state using data from incoming object
   *
   * @param {Object} newState
   */
  const handleStateChange = newState => {
    const { cellContents, activePlayer, winner, draw } = newState;
    setCellContents(cellContents);
    setActivePlayer(activePlayer);
    setWinner(winner);
    setDraw(draw);
  };

  // Listen for state changes
  socket.on('state change', handleStateChange);

  /**
   * Computes and returns the next game state using the next cell contents
   *
   * @param {String[]} cellContents
   * @return {Object} nextGameState
   */
  const getNextGameState = cellContents => {
    return {
      activePlayer: activePlayer === 'X' ? 'O' : 'X',
      cellContents, 
      winner: getWinner(cellContents),
      draw: cellContents.every(c => c === '')
    }
  };

  /**
   * Checks for winning combinations in the next cell contents. If it finds
   * one, returns the winner, else returns the empty string (default).
   *
   * @param {String[]} cellContents
   * @return String winner
   */
  const getWinner = cellContents => {
    const winningCombos = [
      // Horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      // Vertical
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      // Diagonal
      [0, 4, 8],
      [2, 4, 6]
    ];

    let combo;
    for (let i = 0; i < winningCombos.length; i++) {
      combo = winningCombos[i];

      if (cellContents[combo[0]] === cellContents[combo[1]]
        && cellContents[combo[0]] === cellContents[combo[2]]) {
        return cellContents[combo[0]];
      }
    }

    return '';
  };

  if (!myPlayer) {
    return  "You must provide a player (X or O)";
  }

  const isActivePlayer = activePlayer === myPlayer;
  const isWinner = winner === myPlayer;

  return (
    <div className="App">
      <MessageBox 
        winner={winner}
        isWinner={isWinner}
        isActivePlayer={isActivePlayer}
        draw={draw} 
        restart={restart}
      />
      <Board
        disabled={winner || draw || !isActivePlayer}
        fillCell={fillCell} 
        cellContents={cellContents}
      />
    </div>
  );
}

export default App;
