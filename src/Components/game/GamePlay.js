import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import firebase from "../../util/firebase";
import Square from './Square';
import { getWinner, removeUsername } from '../Controller/PlayerController';
import { removeRoom } from '../Controller/RoomController';

const GamePlay = (props) => {

    //-----------------------------DECLARE VARIABLES--------------------------------------------------------------------------------------------------------

    const history = useHistory();
    //Props
    const { rooms, nickname, isDarkMode, profilepic } = props;
    //Ref
    const roomRef = firebase.database().ref(`allRooms/${rooms}`);
    const boardRef = firebase.database().ref(`allRooms/${rooms}/board/board`);
    const player1Ref = firebase.database().ref(`allRooms/${rooms}/player1`);
    const symbolRef = firebase.database().ref(`allRooms/${rooms}/turn/turn`);
    const posRef = firebase.database().ref(`allRooms/${rooms}/position`);
    const fullRef = firebase.database().ref(`allRooms/${rooms}/full`);
    //Board Info
    let newBoard = [];
    const [board, setBoard] = useState([
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", ""]);
    const BoardSize = 25;
    const tileSize = 5;
    const firstTo = 4;

    const [isFilled, setIsFilled] = useState(false);

    //Player Info
    const [isJoin, setIsJoin] = useState(false);
    const [isP1Win, setP1Win] = useState(false);
    const [isP2Win, setP2Win] = useState(false);
    const [allUser, setAllUser] = useState([]);
    const [isPlayer1, setIsPlayer1] = useState(false);
    const [isPlayer2, setIsPlayer2] = useState(false);
    const [player1Turn, setPlayer1Turn] = useState(false);
    const [player2Turn, setPlayer2Turn] = useState(false);
    const [winPlayer, setWin] = useState("");
    const [waitMsg, setMsg] = useState("Waiting for other player...");
    const [rule, setRule] = useState(true);
    let username = nickname;
    let symbol = "";
    var player1;


    //--------------------------------------------------------------------------------------------------------------------------------------------------

    const findPlayer1 = () => {
        player1Ref.once("value").then((snapshot) => {
            player1 = snapshot.child(`nickname`).val();

            //Check if the client is player 1 or player 2 based on their username
            if (player1 === `${username}`) {
                setIsPlayer1(true);
                setIsPlayer2(false);
            }
            else {
                setIsPlayer2(true);
                setIsPlayer1(false);

            }


        })


    }

    //check DRAW when both players fill all the tiles in the board
    const allFilled = (element) => {
        return element != "";
    }

    const onClick = (square) => {

        //first symbol is X
        let newTurn = "X";
        const SquareRef = firebase.database().ref(`allRooms/${rooms}/board/board/${square}`);
        const turnRef = firebase.database().ref(`allRooms/${rooms}/turn`);

        posRef.set({
            "position": square,
        })
        //Update the board in database
        boardRef.on("value", (snapshot) => {
            newBoard = (snapshot.val());

        })
        //Check for player's turn
        symbolRef.once("value", (snapshot) => {
            newTurn = (snapshot.val());
            if (board[square] == "") {
                if (newTurn === "X") { //Player 1 just go
                    turnRef.update({
                        "turn": "O" //Update to O for player 2
                    })

                }
                if (newTurn === "O") { //Player 2 just go

                    turnRef.update({
                        "turn": "X" //Update to X for player 1
                    })

                }
            }
            else {
                if (newTurn === "X") { //Player 1 click on filled tile
                    turnRef.update({
                        "turn": "X" //Stay the same
                    })

                }
                if (newTurn === "O") { //Player 2 click on filled tile

                    turnRef.update({
                        "turn": "O" //Stay the same
                    })

                }
            }
            //Set the board in the database
            SquareRef.transaction(() => {
                if (board[square] === "") {
                    return newTurn;
                }
                if (board[square] === "X" || board[square] === "O") {
                    return;
                }
            })

        }
        )
        //Update the display
        setBoard(newBoard);
    };

    const newGame = () => {
        history.push("/");
    }
    const handleClose = () => {
        setRule(false);
    }
    //Update board to other player
    useEffect(() => {
        let isMounted = true;
        let startPos;
        let currMove;
        let lastPlayer;
        setPlayer1Turn(true);
        setPlayer2Turn(false);
        findPlayer1();




        posRef.child("position").on("value", (snapshot) => {
            currMove = (snapshot.val());
            startPos = Math.floor((currMove / tileSize)) * tileSize;
        })
        symbolRef.on("value", snapshot => {
            lastPlayer = snapshot.val();
            if (lastPlayer == "X") {
                lastPlayer = "O";
            }
            else if (lastPlayer == "O") {
                lastPlayer = "X";
            }
        })
        // Update the new board to other player screen
        boardRef.on("value", (snapshot) => {
            newBoard = (snapshot.val());
            // var matrix = listToMatrix(newBoard, 5);
            if (isMounted) {
                setBoard(newBoard);
                var winner = getWinner(currMove, startPos, lastPlayer, newBoard, BoardSize, tileSize, firstTo);

                if (winner == "" && newBoard.every(allFilled)) {
                    setIsFilled(true);
                    setP1Win(false);
                    setP2Win(false);
                }
                else if (winner == "X") {
                    setP1Win(true);
                    setP2Win(false);
                    setWin(winner);

                }
                else if (winner == "O") {
                    setP1Win(false);
                    setP2Win(true);
                    setWin(winner);
                }

            }
        })
        //Update their turn based on their symbol
        symbolRef.on("value", (snapshot) => {
            symbol = (snapshot.val());
            if (isMounted) {

                if (symbol === "X") {
                    setPlayer2Turn(false);
                    setPlayer1Turn(true);
                }
                else if (symbol === "O") {
                    setPlayer2Turn(true);
                    setPlayer1Turn(false);
                }
            }
        })

        roomRef.on("value", snapshot => {
            var available1 = snapshot.child(`player1`).exists();
            var available2 = snapshot.child(`player2`).exists();
            if (isMounted) {
                if (available1 == false || available2 == false){
                   fullRef.set({
                       "full":false,
                   })
                    }
                else if (available1 == true && available2 == true) {
                    fullRef.set({
                        "full":true,
                    })
                }

            }
        })





        return () => {
            isMounted = false


        };


    }, [])


    useEffect(() => {

        const socket = io("https://better-tic-tac-toe-server.herokuapp.com/");


        if (rooms) {
            //Connect socket

            if (socket) {
                //Send player to room
                socket.emit('join', { username, rooms });


                socket.on('updateUsersList', msg => {
                    setAllUser(msg);
                })
                setIsJoin(true);
                //Room is full (2 players)

                socket.on('room_join_full', ({ error, room }) => {

                    //Remove user from room database if full


                })




            }


        }

        return () => {
            if (socket) {
                removeUsername(username, rooms);
                socket.disconnect();
                setBoard([
                    "", "", "", "", "",
                    "", "", "", "", "",
                    "", "", "", "", "",
                    "", "", "", "", "",
                    "", "", "", "", ""]);
                roomRef.on("value", snapshot => {
                    var available1 = snapshot.child(`player1`).exists();
                    var available2 = snapshot.child(`player2`).exists();
                    //person who enter the room will be player 2 

                    if ((available1 == false && available2 == false)) {
                        removeRoom(`${rooms}`);
                    }



                })


            }

        }

    }, [rooms])


    return (
        <main className="container flex flex-ai-c">

            <section className="gameplay-container flex">
                <p className={isDarkMode ? "game-id-darkmode" : "game-id"}>{`ID: ${rooms}`}
                </p>
                {/* <img className="profile-pic" src={profilepic} alt="" /> */}

                <article className="user-container flex">

                    <div className={player1Turn ? "user1-order" : "user1"}>
                        {allUser[0]}
                    </div>
                    <div className={player2Turn ? "user2-order" : "user2"}>
                        {allUser[1]}
                    </div>

                    {(allUser.length < 2) && (
                        <div class={isDarkMode ? "wait-msg-darkmode" : "wait-msg"}>
                            {waitMsg}
                        </div>
                    )}


                </article>

                {/* <p className={isDarkMode ? "username-darkmode" : "username"}>{`username: ${nickname}`}</p> */}
                {isJoin && (
                    <div className={isDarkMode ? "board-darkmode" : "board"}>
                        {rule && (
                            <div className={isDarkMode ? "rule-container-darkmode flex" : "rule-container flex "}>
                                <button className={isDarkMode ? "close-darkmode" : "close"} onClick={handleClose}> X </button>
                                <p className="rule-title"> RULE: </p>
                                <p className="rule-text"> First to 4 wins  </p>
                            </div>
                        )}
                        <div className="row">
                            <Square val={board[0]} onClick={() => onClick(0)} isDarkMode={isDarkMode} />
                            <Square val={board[1]} onClick={() => onClick(1)} isDarkMode={isDarkMode} />
                            <Square val={board[2]} onClick={() => onClick(2)} isDarkMode={isDarkMode} />
                            <Square val={board[3]} onClick={() => onClick(3)} isDarkMode={isDarkMode} />
                            <Square val={board[4]} onClick={() => onClick(4)} isDarkMode={isDarkMode} />

                        </div>
                        <div className="row">
                            <Square val={board[5]} onClick={() => onClick(5)} isDarkMode={isDarkMode} />
                            <Square val={board[6]} onClick={() => onClick(6)} isDarkMode={isDarkMode} />
                            <Square val={board[7]} onClick={() => onClick(7)} isDarkMode={isDarkMode} />
                            <Square val={board[8]} onClick={() => onClick(8)} isDarkMode={isDarkMode} />
                            <Square val={board[9]} onClick={() => onClick(9)} isDarkMode={isDarkMode} />

                        </div>
                        <div className="row">
                            <Square val={board[10]} onClick={() => onClick(10)} isDarkMode={isDarkMode} />
                            <Square val={board[11]} onClick={() => onClick(11)} isDarkMode={isDarkMode} />
                            <Square val={board[12]} onClick={() => onClick(12)} isDarkMode={isDarkMode} />
                            <Square val={board[13]} onClick={() => onClick(13)} isDarkMode={isDarkMode} />
                            <Square val={board[14]} onClick={() => onClick(14)} isDarkMode={isDarkMode} />

                        </div>
                        <div className="row">
                            <Square val={board[15]} onClick={() => onClick(15)} isDarkMode={isDarkMode} />
                            <Square val={board[16]} onClick={() => onClick(16)} isDarkMode={isDarkMode} />
                            <Square val={board[17]} onClick={() => onClick(17)} isDarkMode={isDarkMode} />
                            <Square val={board[18]} onClick={() => onClick(18)} isDarkMode={isDarkMode} />
                            <Square val={board[19]} onClick={() => onClick(19)} isDarkMode={isDarkMode} />
                        </div>
                        <div className="row">
                            <Square val={board[20]} onClick={() => onClick(20)} isDarkMode={isDarkMode} />
                            <Square val={board[21]} onClick={() => onClick(21)} isDarkMode={isDarkMode} />
                            <Square val={board[22]} onClick={() => onClick(22)} isDarkMode={isDarkMode} />
                            <Square val={board[23]} onClick={() => onClick(23)} isDarkMode={isDarkMode} />
                            <Square val={board[24]} onClick={() => onClick(24)} isDarkMode={isDarkMode} />

                        </div>
                        {isPlayer1 && player1Turn && ( //You're player 1 and its your turn
                            <div className="yourturn flex">
                                <p className={isDarkMode ? "player1Text-darkmode" : "player1Text"}>  Your Turn </p>
                            </div>
                        )}

                        {isPlayer1 && player2Turn && ( //You're player 1 and its other player turn
                            <div className={isDarkMode ? "player1Overlay turn-darkmode flex" : "player1Overlay turn flex "}>
                                <p className="player1Text"> Opponent Turn </p>

                            </div>
                        )}




                        {isPlayer2 && player2Turn && (
                            <div className="yourturn flex">
                                <p className={isDarkMode ? "player2Text-darkmode" : "player2Text"}>  Your Turn </p>
                            </div>
                        )}

                        {isPlayer2 && player1Turn && (
                            <div className={isDarkMode ? "player2Overlay turn-darkmode flex" : "player2Overlay turn flex "}>
                                <p className="player2Text"> Opponent Turn </p>
                            </div>
                        )}



                        {isP1Win && (
                            <div className="win-overlay">
                                <div className="win">
                                    {`${winPlayer} WINS `}
                                </div>
                                <div className="newGame" onClick={newGame}>
                                    NEW GAME
                                </div>

                            </div>
                        )}
                        {isP2Win && (
                            <div className="win-overlay">
                                <div className={isDarkMode ? "win-darkmode" : "win"}>
                                    {`${winPlayer} WINS `}
                                </div>
                                <div className="newGame" onClick={newGame}>
                                    NEW GAME
                                </div>
                            </div>
                        )}


                        {isFilled && (
                            <div className="draw-overlay">
                                <div className={isDarkMode ? "draw-darkmode" : "draw"}>
                                    DRAW !!!
                                </div>
                                <div className="newGame" onClick={newGame}>
                                    NEW GAME
                                </div>
                            </div>
                        )}




                    </div>

                )}
            </section>

        </main>
    );
}

export default GamePlay;
