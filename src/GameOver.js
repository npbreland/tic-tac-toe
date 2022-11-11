export const GameOver = ({ winner, restart }) => {
  return (
    <div id="game-over">
      <div>{winner} wins!</div>
      <div><button onClick={restart}>Restart</button></div>
    </div>
  );
};
