import React from 'react'


function Task6(props){

    const span1 = {
        backgroundColor : "red"
    }

    const span2 = {
        backgroundColor : "yellow",
        height:"130px",
        width:"300px",
        padding :"20px",
        marginLeft:"470px"
    }

    const span3= {
        backgroundColor : "grey",
        height:"130px",
        width:"300px",
        padding :"20px",
        marginLeft:"470px",
    }
    // const span3:hover={
    //     backgroundColor:"white"
    // }

    if (props.isBooking===true){
return (
    <div >
        <h1 style={span3}>helloo {props.name}</h1>
    </div>
    )}

    else{return(
        <h1 style={span2}>Colour Changed!!</h1>
    )}
}

export default Task6