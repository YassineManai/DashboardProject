const mongoose = require('mongoose')

const Task = mongoose.model('Task',{

ProjectId : {
    type: Number

},
Task:{
    type: String
}  
})
module.exports = Task