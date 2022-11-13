import { Row } from './Row';
import { Cell } from './Cell';

export const Board = ({ disabled, fillCell, cellContents }) => {

  return (
    <table id="board" className={disabled ? 'disabled' : ''}>
      <tbody>
        <Row>
        {cellContents.slice(0, 3).map((contents, key) => (
          <Cell key={key} index={key} contents={contents} fillCell={fillCell} />
        ))}
        </Row>
        <Row>
        {cellContents.slice(3, 6).map((contents, key) => (
          <Cell key={key} index={key + 3} contents={contents} fillCell={fillCell} />
        ))}
        </Row>
        <Row>
        {cellContents.slice(6, 9).map((contents, key) => (
          <Cell key={key} index={key + 6} contents={contents} fillCell={fillCell} />
        ))}
        </Row>
      </tbody>
    </table>
  )
  
}
