const express = require('express')
const router = express.Router();
const Project = require('../models/Project')

router.get("/allprojects", async (req, res) => {

    try {
        projects = await Project.find()
        res.send(projects)

    }
    catch (error) {
        res.send(error)

    }
})
router.post('/CreateProject', async (req, res) => {

    try {
        data = req.body;
        proj = new Project(data);
        savedProject = await proj.save();
        res.send(savedProject)
    }

    catch (error) {
        res.status(404).send(error)
    }

})

router.put("/updateProject/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const newData = {Status : "true" }; // only updating the title attribute
      const updated = await Project.findByIdAndUpdate(id, { $set: newData }, { new: true });
      res.send(updated);
    } catch (error) {
      res.send(error);
    }
  });

  

module.exports = router
