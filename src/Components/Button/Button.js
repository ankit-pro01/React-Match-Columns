import "./Button.css"

const Button = ({title, buttonHandler}) => {
    return (  
        <button className = {`${title.toLowerCase()}-button`} onClick = {buttonHandler}>
            {title}
        </button>
    );
}
 
export default Button;