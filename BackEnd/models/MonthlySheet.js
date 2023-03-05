const mongoose = require('mongoose')

const MonthlySheet = mongoose.model('MonthlySheet', {

    UserId: {
        type: String

    },
    
    Month: {
        type: String
    },
    NbrJTrav: {
        type: Number,
        default: 0

    },
    NbrJConge: {
        type: Number,
        default: 0

    },
    NbrJFeries: {
        type: Number,
        default: 0

    },
    Status: {
        type: Boolean
    },
    NbrHours: {
        type: Number

    },
    Year: {
        type: Number

    }

})
module.exports = MonthlySheet