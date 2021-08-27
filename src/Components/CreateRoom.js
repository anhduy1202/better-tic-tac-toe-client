import { useHistory } from 'react-router-dom';
import { player1Join } from './Controller/RoomController';
import logo from '../image/logo.png';
const CreateRoom = (props) => {
  const { random: roomNum, setRooms, nickname, turn, setTurn, isDarkMode } = props;
  const history = useHistory();
  let randomString = roomNum.toString();
  let board = [
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",];
  setTurn('X');

  const handleClick = () => {

    setRooms(randomString);
    //Person who create the room will be player 1
    player1Join(roomNum, nickname, board, turn, history);

  }
  return (
    <main className="container flex flex-ai-c flex-jc-c">
      <section className="gameplay">
        <img src={logo} alt="Logo" />
        <p className={isDarkMode ? "id-darkmode" : "id"}>{`ROOM ID:`} <span> {`${roomNum}`} </span></p>
        <button type="submit" className={isDarkMode ? "join-darkmode" : "join"} onClick={() => handleClick()}> Join </button>
      </section>
    </main>
  );
}

export default CreateRoom;