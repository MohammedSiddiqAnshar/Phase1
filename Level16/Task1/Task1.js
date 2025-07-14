const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send("Hello from Express!")
})
app.listen(3000,()=>{
    console.log("port running on 3000")
})