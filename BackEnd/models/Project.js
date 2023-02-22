const mongoose = require('mongoose')

const Project = mongoose.model('Project',{

UserId : {
    type: Number
},
ProjectName:{
    type: String
},
CompanyName : {
    type : String 
},
Designation : {
    type: String
},
Status:{
    type: Boolean
}
    
})
module.exports = Project