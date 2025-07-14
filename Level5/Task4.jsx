import { useState } from "react"

function Task4(){
    const [user, setUser] = useState({ name: "", age: "" });

    
        const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value, 
        }));
        };
    
        return (
        <div>
            <h2>Manage Object with useState</h2>
            <label>Name:</label>
            <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            />
            <br />
            <label>Age:</label>
            <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            />
            <br />
            <h3>Output:</h3>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
        </div>
        );
    };
    
export default Task4
