const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const todoSchema=new Schema({
    activity: {type: String, },
    status: {type: String, default:"pending"},
    timetaken: {type: String, default:""},
    action: {type: String, default:"start"},
    userref: [{type: Schema.Types.ObjectId, ref: 'User'}]
})
//{type:String }
const todoModel=mongoose.model('todos',todoSchema)
module.exports=todoModel