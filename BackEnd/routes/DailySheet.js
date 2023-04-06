const express = require('express')
const router = express.Router();
const DailySheet = require('../models/DailySheet')
const MonthlySheet = require('../models/MonthlySheet')
const Task = require('../models/Task')
const mongoose = require('mongoose')
const moment = require('moment');


router.post('/CreateDailySheet/:id', async (req, res) => {

  try {
    const idUser = req.params.id;
    data = req.body;
    data.UserId = idUser
    // Create new daily sheet entry from request body
    const dailySheet = new DailySheet(req.body);

    // Update monthly sheet for the same user and month

    const { UserId, date: dateString, TypeJ } = req.body;
    const dato = moment.utc(dateString, 'YYYY-MM-DD').toDate(); // parse date string and create UTC moment object
    const month = moment.utc(dato).format('MMMM'); // format month name in UTC timezone
    const year = moment.utc(dato).year(); // get year in UTC timezone
    dailySheet.date = dato; // set date to JavaScript Date object
    dailySheet.Month = month; // set month to formatted month name
    dailySheet.Year = year; // set year to year in UTC timezone
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



    // Check if a task with the same project name and user name already exists for the same day

    const { ProjectName } = req.body;
    const existingTask = await Task.findOne({ ProjectName, UserId, Month: month, Year: year });

    let task;
    let totalHours = parseFloat(req.body.TimeF) - parseFloat(req.body.Timed);

    if (existingTask) {
      // If a task already exists, update the totalHours and save it
      task = existingTask;
      totalHours += task.TotlHours;
      task.TotlHours = totalHours;

      await task.save();
    } else {
      // If a task doesn't exist, create a new one
      task = new Task({ ProjectName, TotlHours: totalHours, UserId: idUser, Month: month, Year: year });
      await task.save();
    }

    // Assign the monthly sheet id and task id to the daily sheet
    if (monthlySheet) {
      dailySheet.Monthlysheetid = monthlySheet._id; // assign monthly sheet id to daily sheet
    }
    dailySheet.Taskid = task._id

    res.status(201).send(dailySheet);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }

})



router.post('/CreateDailySheeto/:id', async (req, res) => {

  try {
    const idUser = req.params.id;
    data = req.body;
    data.UserId = idUser
    // Create new daily sheet entry from request body
    const dailySheet = new DailySheet(req.body);

    // Update monthly sheet for the same user and month

    const { UserId, date: dateString, TypeJ } = req.body;
    const dato = moment.utc(dateString, 'YYYY-MM-DD').toDate(); // parse date string and create UTC moment object
    const month = moment.utc(dato).format('MMMM'); // format month name in UTC timezone
    const year = moment.utc(dato).year(); // get year in UTC timezone
    dailySheet.date = dato; // set date to JavaScript Date object
    dailySheet.Month = month; // set month to formatted month name
    dailySheet.Year = year; // set year to year in UTC timezone
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
    // Assign the monthly sheet id and task id to the daily sheet
    if (monthlySheet) {
      dailySheet.Monthlysheetid = monthlySheet._id; // assign monthly sheet id to daily sheet
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
    Dsheet = await DailySheet.find({ Monthlysheetid: id })
    res.send(Dsheet)

  }
  catch (error) {
    res.send(error)

  }
})
router.get("/Daily/:id", async (req, res) => {

  try {
    const id = req.params.id;
    Dsheet = await DailySheet.find({ _id: id })
    res.send(Dsheet)

  }
  catch (error) {
    res.send(error)

  }
})

router.put("/updateDay/:id", async (req, res) => {

  const resourceId = req.params.id;
  const updateData = req.body;

  const { Monthlysheetid } = req.body;

  try {
    const existingResource = await DailySheet.findById(resourceId);
    if (!existingResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const originalTypeJ = existingResource.TypeJ;
    const newTypeJ = updateData.TypeJ;


    const { UserId, date: dateString, ProjectName } = req.body;
    const dato = moment.utc(dateString, 'YYYY-MM-DD').toDate(); // parse date string and create UTC moment object
    const month = moment.utc(dato).format('MMMM'); // format month name in UTC timezone
    const year = moment.utc(dato).year(); // get year in UTC timezone

    let task;
    const existingTask = await Task.findOne({ ProjectName, UserId, Month: month, Year: year });

    // Calculate the new total hours
    const oldTotalHours = parseFloat(existingResource.TimeF) - parseFloat(existingResource.Timed);
    const newTotalHours = parseFloat(updateData.TimeF) - parseFloat(updateData.Timed);
    const totalHoursDiff = newTotalHours - oldTotalHours;
    // Update the total hours in the task
    if (existingTask) {
      const { TotlHours } = existingTask;
      task = existingTask;
      task.TotlHours = TotlHours + totalHoursDiff;
     
      console.log(TotlHours)
      console.log(totalHoursDiff)
      await task.save();
    }



    if (newTypeJ === "Congé" || newTypeJ === "Férié") {
      existingResource.Task = "";
      existingResource.VehiclePrice = "";
      existingResource.Timed = ""
      existingResource.TimeF = ""
      existingResource.ProjectName = ""
      existingResource.Location = ""
    } else {
      existingResource.Timed = updateData.Timed;
      existingResource.TimeF = updateData.TimeF;
      existingResource.ProjectName = updateData.ProjectName;
      existingResource.Location = updateData.Location;
      existingResource.Task = updateData.Task;
      existingResource.VehiclePrice = updateData.VehiclePrice;
    }

    existingResource.TypeJ = newTypeJ;

    const monthlySheet = await MonthlySheet.findOne({ _id: Monthlysheetid });
    const { NbrJTrav, NbrJConge, NbrJFeries } = monthlySheet ?? {};
    const isWorkingDay = newTypeJ === 'travail';
    const isCongeDay = newTypeJ === 'Congé';
    const isFerieDay = newTypeJ === 'Férié';
    let newNbrJTrav = NbrJTrav || 0;
    let newNbrJConge = NbrJConge || 0;
    let newNbrJFeries = NbrJFeries || 0;

    if (originalTypeJ === 'travail') {
      newNbrJTrav--;
    } else if (originalTypeJ === 'Congé') {
      newNbrJConge--;
    } else if (originalTypeJ === 'Férié') {
      newNbrJFeries--;
    }

    if (isWorkingDay) {
      newNbrJTrav++;
    } else if (isCongeDay) {
      newNbrJConge++;
    } else if (isFerieDay) {
      newNbrJFeries++;
    }

    monthlySheet.NbrJTrav = newNbrJTrav;
    monthlySheet.NbrJConge = newNbrJConge;
    monthlySheet.NbrJFeries = newNbrJFeries;
    monthlySheet.Status = false


    const updatedResource = await existingResource.save();
    const updatedMonthlySheet = await monthlySheet.save();

    res.status(200).json({ message: 'Resource updated successfully', data: updatedResource });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
})

module.exports = router