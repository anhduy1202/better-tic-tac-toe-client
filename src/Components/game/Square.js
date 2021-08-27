const Square = (props) => {
    const {val,onClick,isDarkMode} = props;
    return ( 
       <button className={isDarkMode?"square-darkmode" :"square"} onClick={onClick}>
           {val}
       </button>
     );
}
 
export default Square;