import React from 'react'


function Task8(props){

    const span3= {
        backgroundColor : "grey",
        height:"330px",
        width:"300px",
        padding :"20px",
        marginLeft:"500px",
    }


    if (props.show===true){
return (
    <>
    <h1>Students Details:</h1>
    <div style={span3}>
        
        <h1 >Name: {props.name}</h1>
        <h1>Dept : {props.dept}</h1>
        <h1>Year : {props.year}</h1>
    </div></>
    )}

    else{return(
        <h1 style={span2}>Colour Changed!!</h1>
    )}
}

export default Task8