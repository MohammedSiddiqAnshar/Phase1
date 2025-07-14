import React from 'react'
import './index.css'


function Task5(){
    const a = 10;
    const b = 20;

    const span1 = {
        backgroundColor : "red"
    }

    const span2 = {
        backgroundColor : "yellow"
    }

    const span3 = {
        backgroundColor : "grey"
    }

return (
    <div>
    <h1>calculation</h1>
    <p>Addition of <span style={span1}>{a}</span> and <span style={span2}>{b}</span> is <span style={span3}>{a+b}</span></p>
    </div>
    )
}

export default Task5