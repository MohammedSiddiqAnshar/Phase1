const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send("Hello from Express!")
})


app.get('/about',(req,res)=>{
    res.send('About Us Page')
})

app.get('/contact',(req,res)=>{
    res.send('contact Us Page')
})

app.get('/service',(req,res)=>{
    res.send('Our Services Page')
})

app.listen(3000,()=>{
    console.log("port running on 3000")
})