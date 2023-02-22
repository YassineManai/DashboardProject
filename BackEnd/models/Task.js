const mongoose = require('mongoose')

const Task = mongoose.model('User',{

ProjectId : {
    type: Number

},
Task:{
    type: String
}  
})