import { useAuth0 } from '@auth0/auth0-react';
const Login = (props) => {
    const {isDarkMode}=props;
    const {loginWithRedirect} = useAuth0();
    return ( 
        <div>
            <button 
            onClick={()=>loginWithRedirect()}
            className={isDarkMode? "login-darkmode" : "login"}> Login </button>
        </div>
     );
}
 
export default Login;