const express = require('express')
const app = express()


const users = [
    {id:1,name:'siddiq',email:'mdsiddiq@gmail.com'},
    {id:2,name:'dsess',email:'dessp@gmail.com'},
    {id:3,name:'sandy',email:'sandy@gmail.com'}
]

app.use((req,res,next)=>{
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}] [${req.method}] [${req.url}]`)
    next()
})

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