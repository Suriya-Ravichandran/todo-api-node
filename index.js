const express = require("express")
const db = require("./db")
const Todo = require("./models/todo")
const connectdb = require("./db")
const bodyparser= require('body-parser')
// create express app

const app = express()
// database connection
connectdb()
app.use(bodyparser.json())


// create a route heres
app.get("/",(req,res)=>{
    res.status(200).send("<h1>Hello world This is Nodejs</h1>")
})

// create todo
app.post("/api/todo",async(req,res)=>{
    try{
        const data=req.body
        console.log(data)
        const todo=new Todo(data)
        await todo.save()
        res.status(201).json(todo)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

// get all todo
app.get("/api/todo",async(req,res)=>{
    try{
        const todo= await Todo.find()
        res.status(200).json(todo)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})


app.use((req,res)=>{
    res.status(404).send("<h1>404 Page Not Found</h1>")
})

app.listen(8000,()=>{
    console.log("Todo Project is starting...")
    console.log("Your Server is Runing on http://localhost:8000")
})