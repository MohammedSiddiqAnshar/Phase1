import React from 'react'
import { useState } from 'react'

function Task8(){

    const [visible,setVisible] = useState(false)

    const show = ()=>{
        setVisible(!visible)
    }

    return (
    <div>
    <button onClick={show}>
        {visible ? 'hide' : 'show'}
    </button>
    {visible && <div>
        <h1>helloo its unlocked!!</h1>
    </div>}
    </div>
    )
}

export default Task8