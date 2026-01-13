const express = require("express")
const db = require("./db")
const Todo = require("./models/todo")
const connectdb = require("./db")
const bodyparser= require('body-parser')
const User = require("./models/User")
const bcrypt=require("bcrypt")
// create express app

const app = express()
// database connection
connectdb()
app.use(bodyparser.json())


// create a route heres
app.get("/",(req,res)=>{
    res.status(200).send("<h1>Hello world This is Nodejs</h1>")
})


app.post("/api/signin",async (req,res)=>{
    try{
         const {name,email,password} = req.body
         const existingUser=await  User.findOne({email})
         if(existingUser){
             res.status(400).json({error:"User already exists"})
         }
         const hasdedPassword=await bcrypt.hash(password,10)
         const user= new User({
            name,
            email,
            password:hasdedPassword
         })

         await user.save()
         res.status(201).json({message:"User register successfully"})
    }
    catch(err){
         res.status(500).json({error:err.message})
    }
   
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

// update todo
app.put("/api/todo/:id",async(req,res)=>{
    try{
        const todo= await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!todo){
            res.status(404).json({error:"Todo Not found"})
        }
        res.status(200).json(todo)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

// delete todo
app.delete("/api/todo/:id",async(req,res)=>{
    try{
        const todo= await Todo.findByIdAndDelete(req.params.id,req.body,{new:true})
        if(!todo){
            res.status(404).json({error:"Todo Not found"})
        }
        res.status(200).json({message:"Todo Deleted Success"})
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