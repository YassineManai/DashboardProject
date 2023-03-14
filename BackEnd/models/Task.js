const mongoose = require('mongoose')

const Task = mongoose.model('Task', {

    ProjectId: {
        type: Number

    },
    ProjectName: {
        type: String
    },
    TotlHours: {
        type: Number
    },
    UserId: {
        type: String
    },
    UserName: {
        type: String
    },
    Month: {
        type: String
    },
    Year: {
        type: Number

    }

})
module.exports = Task