const express = require('express')
const app = express()


const users = [
    {id:1,name:'siddiq',email:'mdsiddiq@gmail.com'},
    {id:2,name:'dsess',email:'dessp@gmail.com'},
    {id:3,name:'sandy',email:'sandy@gmail.com'}
]

app.get('/api/users',(req,res)=>{
    res.send(users)
})


app.get('/api/users/:id',(req,res)=>{
    const userId = req.params.id
    res.send(`USERID:${userId}`)
})



app.listen(3000,()=>{
    console.log("port running on 3000")
})