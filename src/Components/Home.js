import Login from "./Login";
import logo from '../image/logo.png';
import EnterRoom from "./EnterRoom";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import firebase from "../util/firebase";
import { removeRoom } from "./Controller/RoomController";


const Home = (props) => {
    const {randomGuest,setRandomGuest, isGuest, setGuest, rooms, setRandom, setRooms, turn, setTurn, isDarkMode, isFull } = props;
    const { user, isAuthenticated } = props;
    const [find, setFind] = useState(0);
    const roomRef = firebase.database().ref(`allRooms/${rooms}`)
    //Generate randomm room number from 10000 to 99999
    const randomRoom = () => {
        setRandom(Math.floor(Math.random() * (99999 - 10000) + 10000));

    }
    useEffect(() => {

        roomRef.on("child_removed", snapshot => {


        })

    }, [])
    const handleClick = () => {
        setGuest(true);
        let random = Math.floor(Math.random() * (999999 - 100000) + 100000);
        setRandomGuest(random.toString());
    }
    return (
        <main className="home flex flex-jc-c flex-ai-c">
            <section className={isAuthenticated ? "header-loggedIn" : "header flex flex-ai-c"}>
                <img src={logo} alt="Logo" />
                <p className={isDarkMode ? "better-darkmode" : "better"}> Better </p>
                <p className={isDarkMode ? "ttt-darkmode" : "ttt"}> Tic-Tac-Toe </p>

                {!isAuthenticated  && !isGuest && 
                    (
                        <div className="login-container flex">
                            <Login isDarkMode={isDarkMode} />
                            <button className="guest" onClick={handleClick}> Browse as Guest </button>
                        </div>
                    )}
                {isAuthenticated && !isGuest && (
                    <section className="room flex">
                        <header className={isDarkMode ? "greeting-darkmode" : "greeting"}> {`Hello, ${user.nickname}`}</header>
                        <Link className={isDarkMode ? "create-darkmode" : "create"} to='/create' onClick={() => randomRoom()}>
                            Create Room
                        </Link>

                        <EnterRoom
                            className="enterRoom"
                            setFind={setFind}
                            find={find}
                            setRooms={setRooms}
                            nickname={user.nickname}
                            turn={turn}
                            setTurn={setTurn}
                            isDarkMode={isDarkMode}
                            isAuthenticated={isAuthenticated}
                            isGuest={isGuest}
                        />
                        <ToastContainer
                            position="bottom-center"
                            autoClose={4000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </section>

                )}
                {!isAuthenticated && isGuest && (
                    <section className="room flex">
                        <header className={isDarkMode ? "greeting-darkmode" : "greeting"}> {`Hello, ${randomGuest}`}</header>
                        <Link className={isDarkMode ? "create-darkmode" : "create"} to='/create' onClick={() => randomRoom()}>
                            Create Room
                        </Link>

                        <EnterRoom
                            className="enterRoom"
                            setFind={setFind}
                            find={find}
                            setRooms={setRooms}
                            nickname={randomGuest}
                            turn={turn}
                            setTurn={setTurn}
                            isDarkMode={isDarkMode}
                            isGuest={isGuest}
                        />
                        <ToastContainer
                            position="bottom-center"
                            autoClose={4000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </section>

                )}

            </section>

        </main>
    );
}

export default Home;