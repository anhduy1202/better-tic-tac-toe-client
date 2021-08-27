import { useAuth0 } from "@auth0/auth0-react";



const Logout = () => {
    const {logout} = useAuth0();
    return (  
        <div>

            <p 
            onClick={()=>logout()}
            className="logout"> Log out </p>
        </div>
    );
}
 
export default Logout;