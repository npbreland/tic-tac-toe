export const Row = ({ children }) => {
  return (
    <tr>
      {children.map(cell => cell)}
    </tr>
  );
}
