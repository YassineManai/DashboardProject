const express = require('express')
const router = express.Router();

const Task = require('../models/Task');

router.get("/allTask/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const tasks = await Task.find({ UserId: id });

        if (tasks.length === 0) {
            return res.status(404).send("No tasks found for this user");
        }

        res.send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

router.get("/allTasks", async (req, res) => {

    try {
        tasks = await Task.find()
        res.send(tasks)

    }
    catch (error) {
        res.send(error)

    }
})


module.exports = router
