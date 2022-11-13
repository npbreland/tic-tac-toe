export const WinnerMessage = ({ isWinner }) => {
  return <div>{isWinner ? 'You' : 'They' } win!</div>;
};
