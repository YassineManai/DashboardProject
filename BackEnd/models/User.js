const mongoose = require('mongoose')

const User = mongoose.model('User',{

FirstName : {
    type: String

},
LastName:{
    type: String
},
Email : {
    type : String 
},
Password:{
    type: String
},
Phone :{
    type : Number
},
Lastadd:{
    type:Date
},
MonthlySheetid :{
    type: String

},


    
})
module.exports = User