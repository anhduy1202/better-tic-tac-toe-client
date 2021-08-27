import './scss/style.css';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './Permanent/NavBar';
import Footer from './Permanent/Footer';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import { useEffect, useState } from 'react';
import CreateRoom from './Components/CreateRoom';
import GamePlay from './Components/game/GamePlay';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Compete from './Components/allRooms/Compete';
import Error from './Components/_errorPage';
import About from './Components/About';

function App() {
  const { user, isAuthenticated } = useAuth0();
  const [random, setRandom] = useState(0);
  const [rooms, setRooms] = useState();
  const [turn, setTurn] = useState();

  const [isDarkMode, setDarkMode] = useState(false);





  return (
    <Router>

      <main className={isDarkMode ? `App-darkmode` : `App`}>
        <NavBar isAuthenticated={isAuthenticated} isDarkMode={isDarkMode}
          setDarkMode={setDarkMode}
        />
        <div className={isDarkMode ? `wrapper-darkmode ` : `wrapper `}>
          <Switch>
            <Route exact path="/">
              <Home user={user}
                isAuthenticated={isAuthenticated}
                setRandom={setRandom}
                rooms={rooms}
                setRooms={setRooms}
                turn={turn}
                setTurn={setTurn}
                isDarkMode={isDarkMode}


              />
            </Route>
            {isAuthenticated && (
              <div className="room">
                <Route exact path="/create">
                  <CreateRoom
                    random={random}
                    setRooms={setRooms}
                    nickname={user.nickname}
                    turn={turn}
                    setTurn={setTurn}
                    isDarkMode={isDarkMode}
                  />
                </Route>
                <Route path="/gameplay/:rooms">
                  <GamePlay
                    rooms={rooms}
                    nickname={user.nickname}
                    profilepic={user.picture}
                    isDarkMode={isDarkMode}


                  />
                </Route>
                <Route exact path='/compete'>
                  <Compete
                    rooms={rooms}
                    setRooms={setRooms}
                    nickname={user.nickname}
                    turn={turn}
                    isDarkMode={isDarkMode}


                  />

                </Route>


              </div>
            )}
            <Route exact path='/about'>
              <About isDarkMode={isDarkMode}/>
            </Route>
            <Route>
              <Error isDarkMode={isDarkMode} />

            </Route>
            <ToastContainer
              position="top-center"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </Switch>
          <Footer
            isDarkMode={isDarkMode}
          />
        </div>
      </main>
    </Router >


  );
}

export default App;
