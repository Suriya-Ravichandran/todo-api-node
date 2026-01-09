const express = require("express")

// create express app

const app = express()

// create a route heres
app.get("/",(req,res)=>{
    res.status(200).send("<h1>Hello world This is Nodejs</h1>")
})

app.get("/About",(req,res)=>{
    res.status(200).send("<h1>About Us Page</h1>")
})

app.use((req,res)=>{
    res.status(404).send("<h1>404 Page Not Found</h1>")
})

app.listen(8000,()=>{
    console.log("Todo Project is starting...")
    console.log("Your Server is Runing on http://localhost:8000")
})