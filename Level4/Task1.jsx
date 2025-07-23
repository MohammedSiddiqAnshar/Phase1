import React, { useEffect, useState } from 'react'

const Task1 = () => {

    const [items,setItems] = useState([])

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(data=>setItems(data))

    },[])
    return (

        <div>
            <h1 style={{marginLeft:"650px",padding:"20px"}}>List of Names</h1>
            <ul style={{marginLeft:"650px",padding:'40px'}}>
            {items.map((item,index)=>(
                <li key={index}>{item.id} | {item.name}</li>
            ))}
            </ul>
        </div>
    )
    }

export default Task1