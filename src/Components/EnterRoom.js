import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { player2Join, removeRoom } from './Controller/RoomController';
import firebase from '../util/firebase';

const EnterRoom = (props) => {
    const { isAuthenticated, isGuest, setFind, find, setRooms, nickname, isDarkMode } = props;
    const history = useHistory();
    const roomRef = firebase.database().ref(`allRooms/${find}`);
    const handleSubmit = (e) => {
        e.preventDefault();
        setRooms(find);
        roomRef.once("value", snapshot => {
            var available1 = snapshot.child(`player1`).exists();
            var available2 = snapshot.child(`player2`).exists();
            //person who enter the room will be player 2 

            if (available1 == false || available2 == false) {

                player2Join(find, nickname, history, toast);
            }
            else if (available1 == true && available2 == true) {
                history.replace("/");

                toast.warn(`⚠️ Room is Full`, {
                    position: "top-center",
                    autoClose: 4500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }


        })

    }
    return (
        <div className="find">
            {console.log(isGuest)}
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text"
                    className="enter-input"
                    placeholder="Enter Room Id"
                    onChange={(e) => setFind(e.target.value)} />
                <br />
                {isAuthenticated && (
                    <button className={isDarkMode ? "findBtn-darkmode" : "findBtn"}> Find  </button>
                )}
                {isGuest && (
                    <button className={isDarkMode ? "findBtnGuest-darkmode" : "findBtnGuest"}> Find  </button>
                )}
            </form>
        </div>
    );
}

export default EnterRoom;