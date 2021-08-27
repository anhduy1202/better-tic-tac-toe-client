import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../util/firebase";
import { player2Join } from "../Controller/RoomController";
import { toast } from 'react-toastify';

const Compete = (props) => {
    const { rooms, nickname, setRooms, isDarkMode } = props;
    const [allRooms, setAllRooms] = useState([]);
    const [noRooms, setNoRooms] = useState(true);
    const [roomNum, setRoomNum] = useState(3);
    const [isFull, setFull] = useState(false);
    const history = useHistory();
    let set = new Set();
    let obj = {};
    let roomArr;

    const allRoomRef = firebase.database().ref(`allRooms`);

    const roomDB = firebase.database().ref('allRooms');
    useEffect(() => {
        let isMounted = true;
        roomDB.on('value', snapshot => {
            if (isMounted) {
                snapshot.forEach(room => {

                    set.add(room.key);
                    const fullRef = firebase.database().ref(`allRooms/${room.key}/full/full`);
                    fullRef.on("value", snapshot => {
                        if (snapshot.val() == true) {
                            obj[room.key] = "FULL";
                        }
                        else {
                            obj[room.key] = "available";

                        }
                    })

                });
                roomArr = Array.from(set);

                if (roomArr.length == 0) {
                    setNoRooms(true);
                }
                else {
                    setNoRooms(false);
                }
            }
            setAllRooms(obj);
        }


        )


        allRoomRef.on("child_removed", snapshot => {
            if (isMounted) {
                set.delete(snapshot.key);
                let val = snapshot.key;
                delete obj[val];
                roomArr = Array.from(set);

                if (roomArr.length == 0) {
                    setNoRooms(true);
                }
                else {
                    setNoRooms(false);
                }
            }
            setAllRooms(obj);
        })



        return () => { isMounted = false };
    }, [])

    const handleClick = (index) => {
        
      
        const roomRef = firebase.database().ref(`allRooms/${index}`);
        setRooms(index);
        roomRef.once("value", snapshot => {
            var available1 = snapshot.child(`player1`).exists();
            var available2 = snapshot.child(`player2`).exists();
            //person who enter the room will be player 2 
            if (available1 == false || available2 == false) {
                player2Join(index, nickname, history, toast);
            }
            else if (available1 == true && available2 == true) {
                history.goBack();
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
        <section className="roomlist-container flex">
            <header className={isDarkMode ? "roomlist-header-darkmode" : "roomlist-header"}>
                ONLINE ROOMS
            </header>
            {noRooms && (
                <div className={isDarkMode ? "noRoom-darkmode" : "noRoom"}>
                    No Rooms Available :(( <div> Create one !! </div>
                </div>
            )}
            {Object.entries(allRooms).map(([k, v]) => {
                return (
                    <div className={isDarkMode ? "compete-room-darkmode flex" : "compete-room flex"} key={k}>
                        <p className={isDarkMode ? "compete-roomText-darkmode" : "compete-roomText"}> {`Room:`}
                            <span className={isDarkMode ? "compete-roomNo-darkmode " : "compete-roomNo"}>
                                {k} </span>                         <p className={isDarkMode ? "compete-full-darkmode" : "compete-full"}>{`${v}`}</p>
                        </p>
                        <button className={isDarkMode ? "compete-button-darkmode" : "compete-button"} onClick={() => handleClick(k)}> {`JOIN ROOM ⚔️ `} </button>

                    </div>
                )


            })}



            <div className={isDarkMode ? "theend-darkmode" : "theend"}>
                You've reach the end
            </div>
        </section>
    );
}

export default Compete;