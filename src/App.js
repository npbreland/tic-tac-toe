import './App.css';
import { Board } from './Board';
import { Row } from './Row';
import { Cell } from './Cell';
import { GameOver } from './GameOver';
import { useState, useEffect } from 'react';

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
    if (winner) {
      return false;
    }
    const cellContentsCopy = [...cellContents];
    cellContentsCopy[cellIndex] = activePlayer;
    setCellContents(cellContentsCopy);
    toggleActivePlayer();
  }

  const restart = () => {
    setWinner('');
    setCellContents(cellsAllEmpty);
  };


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
      { winner && <GameOver winner={winner} restart={restart} /> }
    </div>
  );
}

export default App;
