import React, { useState } from 'react'

const Task2 = () => {

    const [item,setItem] = useState({
        name:'',
        email:''
    })

    const [response,setResponse] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItem((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async(event)=>{
            event.preventDefault()
            console.log(event.target.name)
    
    

    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(item)
        })
        const result = await response.json()
        setResponse(`Successfully posted:${result.name}`)
    }catch(error){
        setResponse("error in posting")
        console.log(error)
    }}

    return (
    
    <div>
        <form onSubmit={handleSubmit}>
            
            <h1>Form Submission</h1>
            <label htmlFor="name">Name:</label>
        <input
        type="text"
        name='name'
        value={item.name}
        onChange={handleChange}
        required
        />
        <label htmlFor="email">Email:</label>
        <input type="email"
        name='email'
        value={item.email}
        onChange={handleChange}
        required/>
        <button type='submit'>Submit</button>
        </form>
        {response && <p>{response}</p>}</div>
    )
}

export default Task2