const mongoose = require('mongoose')

const Bill = mongoose.model('Bill',{

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
module.exports = Bill