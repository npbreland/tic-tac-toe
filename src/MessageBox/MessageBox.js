import { WinnerMessage } from './WinnerMessage';
import { DrawMessage } from './DrawMessage';
import { TurnMessage } from './TurnMessage';
import { RestartButton } from './RestartButton';

export const MessageBox = ({
  winner,
  isWinner,
  isActivePlayer,
  draw,
  restart
}) => {
  return (
    <div id="message-box">
        { !winner && !draw && <TurnMessage isActivePlayer={isActivePlayer}/> }
        { winner && <WinnerMessage isWinner={isWinner} /> }
        { draw && <DrawMessage /> }
        { (draw || winner) && <RestartButton restart={restart} /> }
    </div>
  )
}
