import React from 'react'
import { useState } from 'react'

function Task9(){

    const [text,setText] = useState('')

    const showText = (event)=>{
        setText(event.target.value)
    }
    return (
    <div>
        <input type="text" placeholder='TypeHere' value={text} onChange={showText} className='Text'/>
        <p>{text ? `Your text:${text}`:"Try to type"}</p>
    </div>
    )
}

export default Task9