export const Cell = ({ index, contents, addPlayer }) => {

  const handleClick = () => {
    if (contents !== '') {
      return false;
    }
    addPlayer(index);
  };

  return (
    <td onClick={handleClick}>{contents}</td>
  );
};
