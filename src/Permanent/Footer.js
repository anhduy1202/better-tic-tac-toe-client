const Footer = (props) => {
    const {isDarkMode}= props;
    return (  
        <footer className={isDarkMode?"footer-darkmode" : "footer"}>
               Made by Daniel Truong @2021
        </footer>
    );
}
 
export default Footer;