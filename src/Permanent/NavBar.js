import { Link, useHistory } from "react-router-dom"
import Logout from "../Components/Logout";
import darkMode from '../image/dark-mode.png';
import lightMode from '../image/light-mode.png';
const NavBar = (props) => {
    const history = useHistory();
    const { isAuthenticated, isDarkMode, setDarkMode } = props;

    const handleDarkMode = () => {
        setDarkMode(!isDarkMode);
    }
  
    return (
        <nav className = { isDarkMode ? "nav-darkmode  flex flex-jc-c flex-ai-c" : "nav flex flex-jc-c flex-ai-c"}>

            <section className="link flex flex-ai-c ">
                <Link to='/' className="nav-home" > Home </Link>
                {!isAuthenticated && (
                    <Link to='/about' className="nav-about"> About </Link>
                )}
                {isAuthenticated && (
                    <div className="additional flex flex-ai-c">
                        <Link to='/compete' className="nav-compete"> {`Compete ⚔️`} </Link>
                        <a className=".logout"> <Logout /> </a>
                    </div>
                )}
            </section>
            {!isDarkMode && (
            <img className="nav-darkMode" src={darkMode} alt="Dark Mode" onClick={handleDarkMode}/>
            )}
             {isDarkMode && (
            <img className="nav-darkMode" src={lightMode} alt="Dark Mode" onClick={handleDarkMode}/>
            )}
        </nav>
    );
}

export default NavBar;