const mongoose = require("mongoose")

const TodoSchema=new mongoose.Schema({
    title:String,
    decription:String,
    status:String,
})

module.exports = mongoose.model("Todo",TodoSchema);