const express = require('express');
const app = express();
const cors = require('cors');    
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
require('./config/Connect');



const userRoute = require('./routes/user');
const ProjectRoute = require('./routes/Project');
const BillRoute = require('./routes/Bill');
const DailySheet = require('./routes/DailySheet');
const MonthlySheet = require('./routes/MonthlySheet');
const Task = require('./routes/Task');






app.use('/user', userRoute);
app.use('/project',ProjectRoute)
app.use('/Bill',BillRoute)
app.use('/dailysheet',DailySheet)
app.use('/monthlysheet',MonthlySheet)
app.use('/task',Task)





app.get('/',(req,res) => {
    res.json({success: true , message:'Welcome to backend ! '}) ;
}) ;












app.listen(3000, () => {
    console.log('Connected Server');
});