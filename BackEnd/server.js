const express = require('express');
const app = express();
const cors = require('cors');    
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
require('./config/Connect');
require


const userRoute = require('./routes/user');
const ProjectRoute = require('./routes/Project');

const DailySheet = require('./routes/DailySheet');
const MonthlySheet = require('./routes/MonthlySheet');
const Task = require('./routes/Task');
const Mail = require('./routes/mail')





app.use('/user', userRoute);
app.use('/project',ProjectRoute)

app.use('/dailysheet',DailySheet)
app.use('/monthlysheet',MonthlySheet)
app.use('/task',Task)
app.use('/Mail',Mail)





app.get('/',(req,res) => {
    res.json({success: true , message:'Welcome to backend ! '}) ;
}) ;












app.listen(3000, () => {
    console.log('Connected Server');
});