const express = require('express')
const router = express.Router();
const MonthlySheet = require('../models/MonthlySheet')








router.get("/allMonthlySheet/:id", async (req, res) => {

    try {
        const id = req.params.id;
        Msheet = await MonthlySheet.find({UserId: id})
        res.send(Msheet)

    }
    catch (error) {
        res.send(error)

    }
})





module.exports = router