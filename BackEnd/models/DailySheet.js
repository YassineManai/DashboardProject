const mongoose = require('mongoose')

const DailySheet = mongoose.model('DailySheet', {

    UserId: {
        type: String

    },
    Monthlysheetid: {
        type: String
    },
    Date: {
        type: Date
    },
    Timed: {
        type: String
    },
    TimeF: {
        type: String
    },
    TypeJ: {
        type: String
    },
    Task:{
        type:String
    },
    ProjectName: {
        type: String
    },
    Designation: {
        type: String
    },
    Day: {
        type: String
    },
    VehiclePrice: {
        type: String,
        default: 0
    },
    Location: {
        type: String
    },
    Year: {
        type: Number
    }

})
module.exports = DailySheet