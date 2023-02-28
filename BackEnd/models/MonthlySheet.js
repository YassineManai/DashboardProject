const mongoose = require('mongoose')

const MonthlySheet = mongoose.model('MonthlySheet',{

UserId : {
    type: Number


},
Month:{
    type: String
},
NbrJTrav : {
    type : Number
 
},
NbrJConge : {
    type: Number

},
NbrJFeries:{
    type: Number

},
Status : {
    type : Boolean
},
NbrHours:{
    type : Number

},
Year : {
    type : Number

}
    
})
module.exports = MonthlySheet