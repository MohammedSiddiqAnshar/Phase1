import { useState } from "react"

function Task12(){

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')

    const handleSubmit =(event)=>{
        event.preventDefault()
        console.log("Name:",name)
        console.log("email:",email)
    }


    {
    return(
        <div>
        <form onSubmit={handleSubmit}>
            
        <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
    </div>

    <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </div>

    <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    <p>{name=="siddiq" ? "welcome Back!!" : "please Login"}</p>
        </div>
    )}
}
export default Task12