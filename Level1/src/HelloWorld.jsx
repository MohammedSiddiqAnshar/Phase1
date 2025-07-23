import React from "./assets/React.png"

function HelloWorld(props){
    var myname = "Siddiq"
    const a = 10;
    const b = 20;
    const styles = {
        backgroundColor : "green",
        
    }
    
    return(
        <div className="card"> 
        <h1>Hello {myname} !</h1>
        <h3>Lets Dive into the Learning</h3>
        <img src={React} alt="Image" className="react" />
        <ul>
            <li>{props.name}</li>
            <li>{props.price}</li>
            <li>{props.rating}</li>
            
        </ul>
        <p>Welcome to the Training Session</p>
        <p>Addition of {a} and {b} is {a+b}</p>
        </div>
    );}


export default HelloWorld;