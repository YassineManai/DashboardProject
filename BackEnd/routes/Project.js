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

router.put("/Archive/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newData = { Status: "true" }; // only updating the title attribute
    const updated = await Project.findByIdAndUpdate(id, { $set: newData }, { new: true });
    res.send(updated);
  } catch (error) {
    res.send(error);
  }
});

router.put("/Unarchive/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newData = { Status: "false" }; // only updating the title attribute
    const updated = await Project.findByIdAndUpdate(id, { $set: newData }, { new: true });
    res.send(updated);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/DelProject/:id", async (req, res) => {

  try {
    id = req.params.id
    deletedProject = await Project.findByIdAndDelete({ _id: id })
    res.send(deletedProject)

  }
  catch (error) {
    res.send(error)

  }
})

router.get("/ProjectInfo/:id", async (req, res) => {

  try {
    const id = req.params.id;
    project = await Project.find({ _id: id })
    res.send(project)

  }
  catch (error) {
    res.send(error)

  }
})


router.put("/updateProject/:id", async (req, res) => {
  const resourceId = req.params.id;
  const updateData = req.body;

  try {
    const existingResource = await Project.findById(resourceId);
    if (!existingResource) {
      return res.status(404).json({ message: 'Resource not found' });
    } else {
      existingResource.ProjectName = updateData.ProjectName;
      existingResource.CompanyName = updateData.CompanyName;
      existingResource.Designation = updateData.Designation;

      const updatedResource = await existingResource.save();
      res.status(200).json({ message: 'Resource updated successfully', data: updatedResource });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
})


module.exports = router
