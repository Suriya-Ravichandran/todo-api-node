const mongoose = require("mongoose")

const connectdb= async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/todorestapi")
        console.log("Database connected")
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectdb

// connectdb()