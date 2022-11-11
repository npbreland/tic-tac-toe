export const Board = ({ children }) => {

  return (
    <table>
      <tbody>
        {children.map(row => row)}
      </tbody>
    </table>
  )
  
}
