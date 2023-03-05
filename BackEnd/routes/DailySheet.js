const express = require('express')
const router = express.Router();
const DailySheet = require('../models/DailySheet')
const MonthlySheet = require('../models/MonthlySheet')
const mongoose = require('mongoose')
router.post('/CreateDailySheet/:id', async (req, res) => {

  try {
    const idUser = req.params.id;
    data = req.body;
    data.UserId = idUser
    // Create new daily sheet entry from request body
    const dailySheet = new DailySheet(req.body);

    // Update monthly sheet for the same user and month
    const options = { month: 'long' };
    const { UserId, Date: dateString, TypeJ } = req.body;
    const month = new Date(dateString).toLocaleString('en-US', options); // getMonth() returns 0-based month
    const year = new Date(data.Date).getFullYear();
    const monthlySheet = await MonthlySheet.findOne({ UserId, Month: month, Year: year });
    if (!monthlySheet) {
      // Create new monthly sheet entry if it doesn't exist
      const newMonthlySheet = new MonthlySheet({ UserId, Month: month, Year: year });
      newMonthlySheet._id = mongoose.Types.ObjectId();
    
      const { NbrJTrav, NbrJConge, NbrJFeries, NbrHours } = monthlySheet ?? {};
      const isWorkingDay = TypeJ !== 'Congé' && TypeJ !== 'Férié';
      const newNbrJTrav = isWorkingDay ? (NbrJTrav || 0) + 1 : NbrJTrav;
      const newNbrJConge = TypeJ === 'Congé' ? (NbrJConge || 0) + 1 : NbrJConge;
      const newNbrJFeries = TypeJ === 'Férié' ? (NbrJFeries || 0) + 1 : NbrJFeries;
      const newNbrHours = (NbrHours || 0) + parseFloat(req.body.TimeF) - parseFloat(req.body.Timed);
      newMonthlySheet.set({ NbrJTrav: newNbrJTrav, NbrJConge: newNbrJConge, NbrJFeries: newNbrJFeries, NbrHours: newNbrHours });
      await newMonthlySheet.save();
      dailySheet.Monthlysheetid = newMonthlySheet._id; // assign monthly sheet id to daily sheet
      await dailySheet.save();
    } else {
      // Update existing monthly sheet entry with new daily sheet data
      const { NbrJTrav, NbrJConge, NbrJFeries, NbrHours } = monthlySheet ?? {};
      const isWorkingDay = TypeJ !== 'Congé' && TypeJ !== 'Férié';
      const newNbrJTrav = isWorkingDay ? (NbrJTrav || 0) + 1 : NbrJTrav;
      const newNbrJConge = TypeJ === 'Congé' ? (NbrJConge || 0) + 1 : NbrJConge;
      const newNbrJFeries = TypeJ === 'Férié' ? (NbrJFeries || 0) + 1 : NbrJFeries;
      const newNbrHours = (NbrHours || 0) + parseFloat(req.body.TimeF) - parseFloat(req.body.Timed);
      monthlySheet.set({ NbrJTrav: newNbrJTrav, NbrJConge: newNbrJConge, NbrJFeries: newNbrJFeries, NbrHours: newNbrHours });
      await monthlySheet.save();
      dailySheet.Monthlysheetid = monthlySheet._id; // assign monthly sheet id to daily sheet
      await dailySheet.save();
    }

    res.status(201).send(dailySheet);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }

})


router.get("/allDailySheet/:id", async (req, res) => {

  try {
    const id = req.params.id;
    Dsheet = await DailySheet.find({ Monthlysheetid : id })
    res.send(Dsheet)

  }
  catch (error) {
    res.send(error)

  }
})




module.exports = router