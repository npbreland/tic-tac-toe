import './App.css';
import { Board } from './Board';
import { Row } from './Row';
import { Cell } from './Cell';
import { GameOver } from './GameOver';
import { useState, useEffect, useCallback } from 'react';
import io from "socket.io-client";

const socket = io.connect('http://localhost:3001');
const params = new URLSearchParams(window.location.search);
const myPlayer = params.get('player');

const App = () => {

  // Player 'X' goes first
  const [ activePlayer, setActivePlayer ] = useState('X');

  const [ winner, setWinner ] = useState('');

  const cellsAllEmpty = ['', '', '', '', '', '', '', '', ''];
  const [ cellContents, setCellContents ] = useState(cellsAllEmpty);

  const toggleActivePlayer = () => {
    setActivePlayer(activePlayer === 'X' ? 'O' : 'X');
  };

  const addPlayerToCell = (cellIndex) => {
    if (activePlayer !== myPlayer) {
      return false;
    }
    if (winner) {
      return false;
    }
    const cellContentsCopy = [...cellContents];
    cellContentsCopy[cellIndex] = activePlayer;
    socket.emit("I moved", {
      cellContents: cellContentsCopy,
    });
  }

  const emitRestart = () => {
    socket.emit("restart");
  };

  const handleRestart = () => {
    setWinner('');
    setCellContents(cellsAllEmpty);
    setActivePlayer('X');
  };

  const handleMove = useCallback(newCellContents => {
    setCellContents(newCellContents);
    toggleActivePlayer();
  });


  useEffect(() => {
    /**
     * Checks for winning combinations in the current cell contents. if it finds
     * one, sets the winner.
     */
    const checkForWin = () => {
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
          setWinner(cellContents[combo[0]]);
          break;
        }
      }

    };
    checkForWin();
  }, [cellContents]);

  socket.on('player moved', handleMove);
  socket.on('restarted', handleRestart);

  if (!myPlayer) {
    return  "You must provide a player (X or O)";
  }

  return (
    <div className="App">
      <Board>
        <Row>
        {cellContents.slice(0, 3).map((contents, key) => (
          <Cell key={key} index={key} contents={contents} addPlayer={addPlayerToCell} />
        ))}
        </Row>
        <Row>
        {cellContents.slice(3, 6).map((contents, key) => (
          <Cell key={key} index={key + 3} contents={contents} addPlayer={addPlayerToCell} />
        ))}
        </Row>
        <Row>
        {cellContents.slice(6, 9).map((contents, key) => (
          <Cell key={key} index={key + 6} contents={contents} addPlayer={addPlayerToCell} />
        ))}
        </Row>
      </Board>
      { winner && <GameOver winner={winner} restart={emitRestart} /> }
    </div>
  );
}

export default App;
