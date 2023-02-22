const mongoose = require('mongoose')

const Bill = mongoose.model('User',{

UserId : {
    type : Number

},
ProjectId : {
    type : String
},
FactDate : {
    type : Date
},
Price:{
    type : Number

}
})