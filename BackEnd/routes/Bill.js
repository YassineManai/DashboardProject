const express = require('express')
const router = express.Router();
const Bill = require('../models/Bill')

router.get("/allBills", async (req, res) => {

    try {
        Bills = await Bill.find()
        res.send(Bills)

    }
    catch (error) {
        res.send(error)

    }
})
router.post('/CreateBill', async (req, res) => {

    try {
        data = req.body;
        bill = new Bill(data);
        savedBill = await bill.save();
        res.send(savedBill)
    }

    catch (error) {
        res.status(404).send(error)
    }

})

module.exports = router