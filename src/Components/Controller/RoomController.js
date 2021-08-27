import firebase from "../../util/firebase";
const allRoomRef = firebase.database().ref("allRooms");

export const player2Join = (find, nickname, history, toast) => {
    const player2Ref = firebase.database().ref(`allRooms/${find}/player2`);


    //Check if there exist a room in database, if not tell user to create one 
    allRoomRef.once("value").then((snapshot) => {
        var available = snapshot.child(`${find}`).exists();
        if (available === true) {
            //Add user to room database
            player2Ref.set({
                nickname,
            })
            
            history.replace('/gameplay/' + find);
        }
        else {
            toast.warn(`⚠️ Room doesn't exist, create one!! `, {
                position: "bottom-center",
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

export const player1Join = (roomNum, nickname, board, turn, history) => {
    const player1Ref = firebase.database().ref(`allRooms/${roomNum}/player1`);
    const boardRef = firebase.database().ref(`allRooms/${roomNum}/board`);
    const turnRef = firebase.database().ref(`allRooms/${roomNum}/turn`);
    player1Ref.set({

        nickname,

    })

    boardRef.set({
        board
    })

    turnRef.set({
        turn
    })
    history.replace('/gameplay/' + roomNum);
}

export const removeRoom = (rooms) => {
    const roomRef = firebase.database().ref(`allRooms/${rooms}`);
    roomRef.remove();
}