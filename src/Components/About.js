import logo from '../image/about.png';
const About = (props) => {
    const {isDarkMode} = props;
    return (  
        <div className="about-container flex flex-ai-c flex-jc-c">
             <div className={isDarkMode?"about-intro-darkmode" :"about-intro"}>
                 Hi, my name is Daniel Truong and I'm the developer of this little web for a hackathon event, hope you enjoy it :)
             </div>
             <img className="about-logo" src={logo} alt="Avatar" />
             <header className={isDarkMode?"guide-header-darkmode" :"guide-header"}>
                    Features of this web game:
             </header>
             <ul className={isDarkMode ?"guide-list-darkmode" :"guide-list"}>
                 <li>
                     - Create Room
                 </li>
                 <li>
                     - Find Room through Room ID
                 </li>
                 <li>
                     - Join online Room (Compete mode)
                 </li>
                 <li>
                     - Dark Mode !!!
                 </li>
             </ul>
            
             <a className={isDarkMode?"att-darkmode" :"att" }href="https://www.streamlinehq.com">Free Get Inspired PNG illustration by Streamline</a>
        </div>
    );
}
 
export default About;