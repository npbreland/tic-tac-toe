export const Cell = ({ index, contents, fillCell }) => {

  const handleClick = () => {
    fillCell(index);
  };

  return (
    <td onClick={handleClick} className={contents ? 'disabled' : ''}>
    {contents}
    </td>
  );
};
