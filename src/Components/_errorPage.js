import errorImg from '../image/error.png';
const Error = (props) => {
    const {isDarkMode}= props;
    return (
        <div className={isDarkMode ?"Error-container-darkmode flex flex-jc-c flex-ai-c" :"Error-container flex flex-jc-c flex-ai-c"}>
               <div className="notfound flex flex-jc-c flex-ai-c">
                <p className="notfound-text"> Page Not Found</p>
                <img className={isDarkMode?"errorImg-darkmode" :"errorImg"} src={errorImg} alt="404 Page" />
                </div>
                <a className={isDarkMode?"attribute-darkmode" :"attribute"} href="https://www.streamlinehq.com">Free Page Not Found 4 PNG illustration by Streamline</a>

        </div>
        
      );
}
 
export default Error;
