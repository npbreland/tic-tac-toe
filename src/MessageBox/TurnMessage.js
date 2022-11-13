export const TurnMessage = ({ isActivePlayer }) => {
  return (
    <div id="turn-message">
      { isActivePlayer ? 'Your turn!' : 'Their turn!' }
    </div>
  );
}
