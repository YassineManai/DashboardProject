const express = require('express')
const router = express.Router();
const MonthlySheet = require('../models/MonthlySheet')



router.get("/allMonthlySheet/:id", async (req, res) => {

    try {
        const id = req.params.id;
        Msheet = await MonthlySheet.find({ UserId: id })
        res.send(Msheet)

    }
    catch (error) {
        res.send(error)

    }
})
router.put("/updateMonthlySheet/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const newData = { Status: "true" }; // only updating the title attribute
        const updated = await MonthlySheet.findByIdAndUpdate(id, { $set: newData }, { new: true });
        res.send(updated);
    } catch (error) {
        res.send(error);
    }
});

router.put("/updateMonthlySheetFalse/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const newData = { Status: "false" }; // only updating the title attribute
        const updated = await MonthlySheet.findByIdAndUpdate(id, { $set: newData }, { new: true });
        res.send(updated);
    } catch (error) {
        res.send(error);
    }
});






module.exports = router