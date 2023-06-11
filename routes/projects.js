const express = require('express');
const { ProjectModel, validateProject, validateTask, validateEditProject, validateEditStatus } = require('../models/projectModel');
const { authAdmin, auth } = require('../middlewares/auth');
const { UserModel } = require('../models/userModel');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const projects = await ProjectModel.findOne({ client_id: req.tokenData._id });
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get('/allProjects', authAdmin, async (req, res) => {
  try {
    const projects = await ProjectModel.find({ user_id: req.tokenData._id });
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post('/', authAdmin, async (req, res) => {
  const validBody = validateProject(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const project = new ProjectModel(req.body);
    if (req.body.client_email) {
      const user = await UserModel.findOne({ email: req.body.client_email });
      if (!user) return res.status(400).json({ err: 'client not found' });
      project.client_id = user._id;
    }
    project.user_id = req.tokenData._id;
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post('/task/:projectID', authAdmin, async (req, res) => {
  const validBody = validateTask(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const projectID = req.params.projectID;
    const project = await ProjectModel.findOne({ _id: projectID });
    if (!project) return res.status(400).json({ err: 'project not found' });
    project.tasks.push({
      name: req.body.name,
      status: { name: '', style: 'rgb(121, 126, 147)' },
    });
    await project.save();

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.put('/status/:projectID', authAdmin, async (req, res) => {
  const validBody = validateEditStatus(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const projectID = req.params.projectID;
    const project = await ProjectModel.findOne({ _id: projectID });
    if (!project) return res.status(400).json({ err: 'project not found' });
    project.status.name = req.body.name;
    project.status.style = req.body.style;
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.put('/task', authAdmin, async (req, res) => {
  const validBody = validateEditStatus(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const projectID = req.query.projectID;
    const taskID = req.query.taskID;
    const project = await ProjectModel.findOne({ _id: projectID });
    if (!project) return res.status(400).json({ err: 'project not found' });
    const task = project.tasks.find((task) => task._id == taskID);
    if (!task) return res.status(400).json({ err: 'task not found' });
    task.status.name = req.body.name;
    task.status.style = req.body.style;
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.put('/changeIsOpen/:projectID', authAdmin, async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const project = await ProjectModel.findOne({ _id: projectID });
    if (!project) return res.status(400).json({ err: 'project not found' });
    project.is_open = !project.is_open;
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.delete('/project/:projectID', authAdmin, async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const project = await ProjectModel.deleteOne({ _id: projectID });

    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.delete('/task', authAdmin, async (req, res) => {
  try {
    const projectID = req.query.projectID;
    const taskID = req.query.taskID;
    const project = await ProjectModel.findOne({ _id: projectID });
    if (!project) return res.status(400).json({ err: 'project not found' });
    project.tasks.splice(project.tasks.indexOf({ _id: taskID }, 1));
    await project.save();

    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
