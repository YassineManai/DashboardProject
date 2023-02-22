const express = require('express');
const app = express();
const cors = require('cors');    
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
require('./config/Connect');



const userRoute = require('./routes/user');
const ProjectRoute = require('./routes/Project')






app.use('/user', userRoute);
app.use('/project',ProjectRoute)


















app.listen(3000, () => {
    console.log('Connected Server');
});